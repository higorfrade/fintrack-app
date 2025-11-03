import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    timeout: 30000
});

// Endpoints que não requerem autorização/autenticação JWT para usar
const excludeEndpoints = ["/login", "/register", "/activate", "/status", "/health"];

// Request Interceptor
axiosConfig.interceptors.request.use((config) => {
    const skipToken = excludeEndpoints.some((endpoint) => {
        return config.url?.includes(endpoint)
    });

    if (!skipToken) {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})


// Response Interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response)  {
        if (error.response.status === 401) {
            window.location.href = "/login";
        } else if (error.response.status === 500) {
            console.error("Erro no servidor. Por favor, tente novamente mais tarde");
        }
    } else if (error.code === "ECONNABORTED") {
        console.error("Request expirou. Por favor, tente novamente");
    }
    return Promise.reject(error);
})

export default axiosConfig;