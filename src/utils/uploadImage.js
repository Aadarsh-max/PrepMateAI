import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

/**
 * Uploads an image to the server with proper error handling and configuration for Vercel
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} The server response data
 */
const uploadImage = async (imageFile) => {
    // Verify we have a valid file
    if (!imageFile || !(imageFile instanceof File)) {
        throw new Error('Invalid image file provided');
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        // Add timeout configuration to prevent Vercel's 10s serverless function timeout
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // Add timeout to prevent hanging requests
            timeout: 30000,
            // Add max content length for larger images
            maxContentLength: 10 * 1024 * 1024, // 10MB
            maxBodyLength: 10 * 1024 * 1024, // 10MB
        });

        if (!response.data) {
            throw new Error('No data received from server');
        }
        
        return response.data;
    } catch (error) {
        // More detailed error logging
        if (error.response) {
            // Server responded with error status
            console.error('Server error during image upload:', {
                status: error.response.status,
                data: error.response.data
            });
        } else if (error.request) {
            // Request made but no response received
            console.error('No response received for image upload:', error.request);
        } else {
            // Error in request setup
            console.error('Error setting up image upload request:', error.message);
        }
        throw error;
    }
};

export default uploadImage;