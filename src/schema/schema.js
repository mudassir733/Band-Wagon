import * as yup from "yup"


export const schema = yup.object().shape({
    username: yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must not exceed 50 characters')
        .required('Username is required'),

    email: yup.string()
        .email('Invalid email')
        .required('Email is required'),

    password: yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});