import "./events.css";
import { searchEventsFiltersContainer } from "../searchEventsFiltersContainer/searchEventsFiltersContainer.js";
import { getEventsList } from "../../../utils/events/getEventsList.js";


export const showEvents = async () => {
    window.scrollTo({ top: 0 }); // Asegurarnos de que el scroll esté arriba del todo en la pag
    try {
        // Crear un elemento div para contener todo el component
        const eventsContainer = document.createElement('div');
        eventsContainer.classList.add('events-container');
        
        // Mostrar el contenedor de filtros de busqueda
        const searchFiltersContainer = await searchEventsFiltersContainer();
        eventsContainer.appendChild(searchFiltersContainer);
        
        // Crear un elemento div para contener la lista de eventos
        const eventsCardContainer = document.createElement('div');
        eventsCardContainer.classList.add('events-card-container');
        
        // Le pasamos el objeto de fechas vacias para que muestre sólo los eventos que aún no pasaron
        getEventsList({}, eventsCardContainer);
        
        eventsContainer.appendChild(eventsCardContainer);

        // Agregar el contenedor de eventos al DOM
        return eventsContainer;

    } catch (error) {
        console.error('Error al mostrar los eventos:', error.message);
    }
};