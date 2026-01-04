import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadProfileImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const res = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method: "POST",
            body: formData
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`O upload na Cloudinary falhou: ${errorData.error.message || res.statusText}`);
        }

        const data = await res.json();
        console.log("Imagem enviada com sucesso.", data);

        return data.secure_url;
    } catch (error) {
        console.error("Erro ao enviar a imagem.", error);
        throw error;
    }
}

export default uploadProfileImage;