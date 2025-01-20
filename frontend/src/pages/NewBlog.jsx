import React from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import FormCreator from '../components/FormCreator';
import formStyle from '../formTemplates/formStyle.json';
import formTemplate from '../formTemplates/formTemplate.json';

function NewBlog() {

  const navigate = useNavigate();

  const createBlog = async (data) => {
    try {
      console.log(data)

      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/createBlog`, data);
      setTimeout(() => {
        navigate(`/blog/${response.data._id}`)
      }, 3000);

      toast.success('Blog Created Successfully');

    } catch (error) {
      toast.error("Error Creating blog");
      console.error('Error submitting blog:', error);
    }
  }

  return (
    <>
      <div><Toaster /></div>

      <div className="flex items-center justify-center bg-gradient-to-b from-blue-200 to-gray-200">
        <div className="m-8">
          <FormCreator
            formTemplate={formTemplate}
            formStyle={formStyle}
            onSubmit={createBlog}
          />
        </div>
      </div>
    </>
  );
}

export default NewBlog;
