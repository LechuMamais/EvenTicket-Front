import { showEventCard } from "../../components/eventss/showEventCard/showEventCard";
import { makeRequest } from "../api";
import { EVENTS_URL } from "../apiUrls";

// Funcion para obtener lista de eventos. Puede recibir los parametros de filtros.
export const getEventsList = async ({
    fromDate = new Date().toISOString().split('T')[0],
    toDate = ''},
    eventsCardContainer) => {
    try {
        // Realizar la solicitud GET a la API con los filtros de fecha

        const eventsData = await makeRequest(`${EVENTS_URL}?fromDate=${fromDate}&toDate=${toDate}`, 'GET');

        if (!eventsData) {
            throw new Error('Error al obtener los eventos');
        }

        // Convertir las fechas de cadena a objetos Date para poder ordenarlos
        eventsData.forEach(event => {
            event.date = new Date(event.date);
        });
        // Ordenar los eventos por fecha
        eventsData.sort((a, b) => a.date - b.date);

        // Mostrar los eventos en el DOM
        if(eventsCardContainer.innerHTML.length>0){
            eventsCardContainer.innerHTML = ''; // Limpiar contenido anterior
        }
        eventsData.forEach(event => {
            const eventCard = showEventCard(event);
            eventsCardContainer.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Error al obtener los eventos:', error.message);
    }
}