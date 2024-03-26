import { showNotification } from "../../components/global/showNotification/showNotification";
import { createProfile } from "../../components/users/profile/profile";
import { makeRequest } from "../api";
import { NEW_EVENTS_URL } from "../apiUrls";

export const createNewEvent = async (userId, formData)=>{
    try {
        const response = await makeRequest(`${NEW_EVENTS_URL}/${userId}`, 'POST', formData);
      
        if (!response) {
            throw new Error("No se recibió respuesta del servidor");
        }
        
        // Acceder a las propiedades de los datos JSON devueltos por makeRequest
        await showNotification("El evento "+ response.event.title +" ha sido creado con éxito", "new-event-created");
        createProfile()
    } catch (error) {
        console.error("Error al crear el evento:", error.message);
        showNotification("Error al crear el evento", 'error');
    }
}