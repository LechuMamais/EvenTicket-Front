import { showNotification } from "../../components/global/showNotification/showNotification";
import { makeRequest } from "../api";
import { LOGIN_URL } from "../apiUrls";

export const login = async (formData)=>{
    try {
        const response = await makeRequest(LOGIN_URL, 'POST', formData)
        if (!response) {
            throw new Error("Error al iniciar sesión");
        }

        // Guarda la informacion del usuario en localStorage
        localStorage.setItem("accessToken", response.token);
        localStorage.setItem("userId", response.user._id);
        localStorage.setItem("userName", response.user.userName);

        // Iniciada la sesión, recargamos para que nos lleve a la home
        window.location.reload();
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        // Mostrar un mensaje de error
        await showNotification("Error al iniciar sesion.", "error-login", 5000);
    }
}