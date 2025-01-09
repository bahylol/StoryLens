import * as yup from 'yup';

// Helper function to map a single validation rule to yup
const applyRule = (validator, rule) => {

    if (rule.type === 'string' || rule.type === 'select' || rule.type === 'radio') {
        validator = yup.string();
    }
    else if (rule.type === 'checkbox') {
        validator = yup.array();
    } else if (rule.type === 'email') {
        validator = yup.string().email(rule.message || 'Invalid email');
    } else if (rule.type === 'number') {
        validator = yup.number();
    }

    if (rule.required) {
        validator = validator.required(rule.message || 'This field is required');
    }

    if (rule.matches) {
        validator = validator.matches(rule.matches, rule.message);
    }

    if (rule.min) {
        validator = validator.min(rule.min, rule.message);
    }

    if (rule.max) {
        validator = validator.max(rule.max, rule.message);
    }

    if (rule.url) {
        validator = validator.url(rule.message || 'Must be a valid URL');
    }

    if (rule.integer) {
        validator = validator.integer(rule.message || 'Must be an integer');
    }

    if (rule.positive) {
        validator = validator.positive(rule.message || 'Must be a positive number');
    }

    if (rule.negative) {
        validator = validator.negative(rule.message || 'Must be a negative number');
    }

    return validator;
};

// Function to map multiple validation rules to yup
export const mapValidationRule = (field) => {
    let validator = yup.mixed(); // Start with a mixed validator as a base

    // If field has multiple validation rules, apply each one
    if (Array.isArray(field.validation)) {
        field.validation.forEach((rule) => {
            validator = applyRule(validator, rule); // Apply each rule
        });
    }

    return validator;
};