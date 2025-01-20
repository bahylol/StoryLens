import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/FormCreator.css';
import { mapValidationRule } from '../utils/yupMapper';
import { UploadIcon } from '../utils/icons';
import JoditEditor from 'jodit-react';
import axios from 'axios';

const FormCreator = ({ formTemplate, formStyle, initialData, imageURL, onSubmit }) => {

    if (!formStyle) {
        formStyle = {};
    }

    const handleFileUpload = async (event, onChange) => {
        const file = event.target.files[0];
        if (file) {
            const label = event.target.nextElementSibling;
            label.innerHTML = `File Uploaded Successfully: ${file.name}`;

            // Convert the file to Base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result;

                // Now send the Base64 image to your API
                try {
                    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/uploadImage`, {
                        image: base64Image,
                    });

                    onChange(response.data.imageUrl); // Update the image URL within form data
                } catch (error) {
                    console.error('Image upload failed:', error);
                    label.innerHTML = 'Image upload failed. Please try again.';
                }
            };

            // Read the file as Base64
            reader.readAsDataURL(file);
        }
    };

    // Build the Yup validation schema based on formTemplate
    const validationSchema = yup.object().shape(
        formTemplate.reduce((acc, field) => {
            if (field.validation) {
                acc[field.name] = mapValidationRule(field);
            }
            return acc;
        }, {})
    );

    // useForm hook from react-hook-form
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialData,
    });

    const onSubmitForm = (data) => {
        onSubmit(data);
    };

    const joditConfig = {
        uploader: {
            insertImageAsBase64URI: true,
            url: imageURL,
            format: 'json'
        },
        readonly: false,
        width: '100%',
        height: 'auto',
        toolbarSticky: false,
        toolbarAdaptive: true,
        placeholder: 'Start typing here...',
        theme: 'default',
    };

    return (
        <div className="container" style={formStyle.container}>
            {/* Form Name */}
            <header style={formStyle.formNameStyle}>{formStyle.formName || "Form"}</header>

            <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
                {formTemplate.map((field, index) => (
                    <div className="input-box" style={formStyle.inputBox} key={index}>

                        {/* Label with with error display */}
                        <label htmlFor={field.name} style={formStyle.inputBoxLabel}>
                            {field.label}
                            {errors[field.name] && <span className="error-message" style={formStyle.errorMessage}>* {errors[field.name]?.message}</span>}
                        </label>

                        {/* Dynamic Form Inputs */}
                        <Controller
                            control={control}
                            name={field.name}
                            render={({ field: controllerField }) => (

                                // File Upload Input
                                field.type === 'file' ? (
                                    <div className="file-upload">
                                        <input
                                            type="file"
                                            id={field.name}
                                            onChange={(event) => handleFileUpload(event, controllerField.onChange)}
                                            style={{ display: 'none' }}
                                        />
                                        <label
                                            htmlFor={field.name}
                                            className="custom-file-upload"
                                            style={formStyle.fileInput}
                                        >
                                            <UploadIcon /> {field.placeholder}
                                        </label>
                                        {/* Display the uploaded image URL as a hyperlink */}
                                        {controllerField.value && (
                                            <div>
                                                <p>Uploaded Image:</p>
                                                <a href={controllerField.value} target="_blank" rel="noopener noreferrer">
                                                    Click here to view the uploaded image
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ) :

                                    // Drop down menu
                                    field.type === 'select' ? (
                                        <select style={formStyle.dropDownMenu} {...controllerField}>
                                            {field.options.map((option, idx) => (
                                                <option key={idx} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) :

                                        //Radio Buttons
                                        field.type === 'radio' ? (
                                            <div className="radio-group">
                                                {field.options.map((option, i) => (
                                                    <div className="radio-option" key={i}>
                                                        <input
                                                            type="radio"
                                                            value={option.value}
                                                            id={`${field.name}-${option.value}`}
                                                            checked={controllerField.value === option.value}
                                                            onChange={() => controllerField.onChange(option.value)}
                                                        />
                                                        <label htmlFor={`${field.name}-${option.value}`} style={formStyle.radioButton}>{option.label}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        ) :

                                            // Check Boxes
                                            field.type === 'checkbox' ? (
                                                <div className="checkbox-group">
                                                    {field.options.map((option, i) => (
                                                        <div className="checkbox-option" key={i}>
                                                            <input
                                                                type="checkbox"
                                                                value={option.value}
                                                                id={`${field.name}-${option.value}`}
                                                                checked={controllerField.value?.includes(option.value) || false}
                                                                onChange={() => {
                                                                    const currentValue = controllerField.value || []; // Default to an empty array if undefined
                                                                    if (currentValue.includes(option.value)) {
                                                                        controllerField.onChange(currentValue.filter(val => val !== option.value));
                                                                    } else {
                                                                        controllerField.onChange([...currentValue, option.value]);
                                                                    }
                                                                }}
                                                            />
                                                            <label htmlFor={`${field.name}-${option.value}`} style={formStyle.checkbox}>
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>

                                            ) :
                                                // Advanced Editor
                                                field.type === 'advanced' ? (
                                                    <div className="jodit-editor-wrapper" style={{ marginTop: '8px' }}>
                                                        <JoditEditor
                                                            type={field.type}
                                                            value={initialData?.[field.name] || field.placeholder || controllerField.value || ''}
                                                            config={joditConfig}
                                                            onBlur={(newValue) => controllerField.onChange(newValue)}
                                                            onChange={(newValue) => controllerField.onChange(newValue)}
                                                        />
                                                    </div>
                                                ) : (

                                                    //Default
                                                    <input
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        {...controllerField}
                                                        style={formStyle.defaultInput}
                                                    />
                                                )
                            )}
                        />
                    </div>
                ))}

                {/* Submit button */}
                <button type="submit" style={formStyle.submitButton}>{formStyle.submitButtonLabel || "submit"}</button>
            </form>
        </div>
    );
};

export default FormCreator;
