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


        //  -----------------------------------     EVENTS CONTAINER MODIFIER     -------------------------------- //

        // Si a la vez que se visualiza el hero también hay un events container debajo, vamos a darle margen suficiente para que quepa

        var heroContainerPreviousHeight
        // Funcion de ajustarle el margin top al eventsContainer para que se ubique debajo del hero.
        const eventsContainerMarginTop = () => {
            //console.log('Modificando events container margin top')
            const heroContainer = document.querySelector('.hero-container');
            const heroContainerActualHeight = heroContainer.offsetHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            const headerAndHeroHeight = heroContainerActualHeight + headerHeight;
            const scrollPosition = window.scrollY;
            const adjustParams = -60;

            if(heroContainerActualHeight < heroContainerPreviousHeight){
                eventsContainer.style.marginTop = `${headerAndHeroHeight+scrollPosition+adjustParams}px`;
            }else if(heroContainerActualHeight > heroContainerPreviousHeight){
                eventsContainer.style.marginTop = `${headerAndHeroHeight+scrollPosition+adjustParams}px`;
            }

            heroContainerPreviousHeight= heroContainerActualHeight
        }

        // Que eventsContainerMarginTop se ejecute solo si está cargado eventsContainer, y si hay tambien heroContainer visualizandose.
        window.addEventListener('scroll', () => {
            const heroContainer = document.querySelector('.hero-container');
            if (eventsContainer && heroContainer) {
                eventsContainerMarginTop();
            }
        });

        // Agregar el contenedor de eventos al DOM
        return eventsContainer;

    } catch (error) {
        console.error('Error al mostrar los eventos:', error.message);
    }
};