// export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_URL = "http://localhost:8080/api";
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

export const API_ENDPOINTS = {
    LOGIN: "/profiles/login",
    REGISTER: "/profiles/register",
    GET_USER_INFO: "/profiles/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories/create",
    UPDATE_CATEGORY: (categoryId) => `/categories/update/${categoryId}`,
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}