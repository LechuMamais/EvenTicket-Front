import { showNotification } from "../../components/global/showNotification/showNotification";
import { makeRequest } from "../api";
import { USERS_URL } from "../apiUrls";

export const getUserData = async (userId) => {
    try {
    /////////////////////////////////////////////////////////////////////////////
    const userData = await makeRequest(`${USERS_URL}/${userId}`, 'GET')
    if (!userData) {
        throw new Error("Error al obtener la información del usuario");
    }

    // Ordenar los eventos del usuario por fechas
    // Convertir las fechas de cadena a objetos Date
    userData.eventsAsOrganizer.forEach(event => {
        event.date = new Date(event.date);
    });

    // Ordenar los eventos por fecha
    userData.eventsAsOrganizer.sort((a, b) => a.date - b.date);

    // Convertir las fechas de cadena a objetos Date
    userData.eventsAsAttendee.forEach(event => {
        event.date = new Date(event.date);
    });

    // Ordenar los eventos por fecha
    userData.eventsAsAttendee.sort((a, b) => a.date - b.date);
    return userData;
    /////////////////////////////////////////////////////////////////////////////
    }catch{
        showNotification("Error al obtener la información del usuario", "error");
    }
}