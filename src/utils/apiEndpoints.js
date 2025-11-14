export const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

export const API_ENDPOINTS = {
    LOGIN: "/profiles/login",
    REGISTER: "/profiles/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}