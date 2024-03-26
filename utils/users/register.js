import { showNotification } from "../../components/global/showNotification/showNotification";
import { createLoginForm } from "../../components/users/loginForm/loginForm";
import { makeRequest } from "../api";
import { REGISTER_URL } from "../apiUrls";

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
        // Si se registra correctamente, lo pasamos al login con el userName ya rellenado
        const mainContainer = document.querySelector("#main-container");
        mainContainer.innerHTML = "";
        mainContainer.appendChild(createLoginForm(response.userName));
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        showNotification('Error al registrar usuario', 'error'), 5000;
    }
}