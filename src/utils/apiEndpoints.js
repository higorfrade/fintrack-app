export const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

export const API_ENDPOINTS = {
    LOGIN: "/profiles/login",
    REGISTER: "/profiles/register",
    GET_USER_INFO: "/profiles/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories/create",
    UPDATE_CATEGORY: (categoryId) => `/categories/update/${categoryId}`,
    DELETE_CATEGORY: (categoryId) => `/categories/delete/${categoryId}`,
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    GET_ALL_INCOMES: "/incomes", 
    ADD_INCOME: "/incomes/add",
    DELETE_INCOME: (incomeId) => `/incomes/delete/${incomeId}`,
    INCOME_DOWNLOAD: "/excel/download/income",
    INCOME_EMAIL: "/email/income",
    GET_ALL_EXPENSES: "/expenses", 
    ADD_EXPENSE: "/expenses/add",
    DELETE_EXPENSE: (expenseId) => `/expenses/delete/${expenseId}`,
    EXPENSE_DOWNLOAD: "/excel/download/expense",
    EXPENSE_EMAIL: "/email/expense",
    APPLY_FILTER: "/filter",
    DASHBOARD_DATA: "/dashboard",
    FORGOT_PASSWORD: "/profiles/forgot-password",
    RESET_PASSWORD: "/profiles/reset-password",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    UPDATE_PROFILE_IMAGE: "/profiles/update-image",
    UPDATE_PROFILE: "/profiles/update-details",
    DELETE_ACCOUNT: "/profiles/delete-account"
}