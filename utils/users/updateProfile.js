import { showNotification } from "../../components/global/showNotification/showNotification";
import { makeRequest } from "../api";
import { USERS_URL } from "../apiUrls";

export const updateProfile = async (userId, formData) => {

    try {
        const response = await makeRequest(`${USERS_URL}/${userId}`, 'PUT', formData)
        if (!response) {
            throw new Error("Error al actualizar el perfil");
        }
        showNotification("Perfil actualizado correctamente", 'success');

        // Actualizado el perfil, lo volvemos a mostrar
        window.location.reload();
    } catch (error) {
        console.error("Error al actualizar el perfil:", error.message);
        showNotification("Error al actualizar el perfil", 'error');
    }
}