import { showNotification } from "../../components/global/showNotification/showNotification";
import { makeRequest } from "../api";
import { REGISTER_URL } from "../apiUrls";
import { login } from "./login";

export const register = async (formData) => {
    try {
        // Verificar si se ingresaron todos los campos
        if (!formData.userName || !formData.email || !formData.password || !formData.passwordRepeat) {
            let missingFields = [];
            if (!formData.userName) missingFields.push('Nombre de usuario');
            if (!formData.email) missingFields.push('Email');
            if (!formData.password) missingFields.push('Contraseña');
            if (!formData.passwordRepeat) missingFields.push('Repetir contraseña');
            const missingFieldsMessage = `Por favor, completa los siguientes campos: ${missingFields.join(', ')}`;
            showNotification(missingFieldsMessage, 'error', 5000);
            return;
        }
        
        // Verificar si las contraseñas coinciden
        if (formData.password !== formData.passwordRepeat) {
            showNotification('Las contraseñas no coinciden', 'error', 5000);
            return;
        }

        // Hacer la solicitud al servidor para registrar al usuario
        const response = await makeRequest(REGISTER_URL, 'POST', formData);
        
        // Verificar la respuesta del servidor
        if (!response) {
            throw new Error("Error al registrar usuario");
        }
        
        // Si se registra correctamente, hacer el inicio de sesión
        login(formData);
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        showNotification('Error al registrar usuario', 'error', 5000);
    }
}
