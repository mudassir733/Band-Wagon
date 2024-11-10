// utils/apiErrorHandler.js
import { toast } from 'react-toastify';

export const handleApiError = (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';


    console.error('API Error:', error);

    switch (error.response?.status) {
        case 400:
            toast.error('Invalid request. Please check your data.');
            break;
        case 401:
            toast.error('Please login to continue.');
            break;
        case 403:
            toast.error('You do not have permission to perform this action.');
            break;
        case 404:
            toast.error('The requested resource was not found.');
            break;
        case 429:
            toast.error('Too many requests. Please try again later.');
            break;
        case 500:
            toast.error('Server error. Please try again later.');
            break;
        default:
            toast.error(errorMessage);
    }

    return errorMessage;
};