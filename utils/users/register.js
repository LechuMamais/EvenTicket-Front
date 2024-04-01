import { showNotification } from "../../components/global/showNotification/showNotification";
import { createLoginForm } from "../../components/users/loginForm/loginForm";
import { makeRequest } from "../api";
import { REGISTER_URL } from "../apiUrls";
import { login } from "./login";

export const register = async (formData)=>{
    try {
        if(formData.password != formData.passwordRepeat){
            showNotification('Las contraseñas no coinciden', 'error', 5000);
            return;
        }
        const response = await makeRequest(REGISTER_URL, 'POST', formData)
        if (!response) {
            throw new Error("Error al registrar usuario");
        }
        // Si se registra correctamente, hacemos el login
        login(formData)
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        showNotification('Error al registrar usuario', 'error'), 5000;
    }
}