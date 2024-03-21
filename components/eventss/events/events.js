import "./events.css";
import { EVENTS_URL } from '../../../utils/apiUrls.js';
import { showEventCard } from "../showEventCard/showEventCard.js";
import { searchEventsFiltersContainer } from "../searchEventsFiltersContainer/searchEventsFiltersContainer.js";

export const showEvents = async () => {
    window.scrollTo({ top: 0 }); // Asegurarnos de que el scroll esté arriba del todo en la pag
    try {
        // PETICION a la API:
        // Obtener la fecha actual en formato ISO (YYYY-MM-DD)
        const currentDate = new Date().toISOString().split('T')[0];
        // Realizar la solicitud GET enviando como parametro fromDate el valor de la fecha actual, formateado.
        const response = await fetch(`${EVENTS_URL}?fromDate=${currentDate}`);
        if (!response.ok) {
            throw new Error('Error al obtener los eventos');
        }
        const eventsData = await response.json();
        console.log(eventsData);

        // Convertir las fechas de cadena a objetos Date
        eventsData.forEach(event => {
            event.date = new Date(event.date);
        });

        // Ordenar los eventos por fecha
        eventsData.sort((a, b) => a.date - b.date);

        // Crear un elemento div para contener todo el component
        const eventsContainer = document.createElement('div');
        eventsContainer.classList.add('events-container');

        // Mostrar el contenedor de filtros de busqueda
        const searchFiltersContainer = await searchEventsFiltersContainer();
        eventsContainer.appendChild(searchFiltersContainer);

        // Crear un elemento div para contener la lista de eventos
        const eventsCardContainer = document.createElement('div');
        eventsCardContainer.classList.add('events-card-container');

        // Iterar sobre los eventos ordenados y crear una tarjeta para cada uno
        eventsData.forEach((event, index) => {
            const eventCard = showEventCard(event);

            // Agregar la tarjeta de evento al contenedor
            eventsCardContainer.appendChild(eventCard);
        });

        eventsContainer.appendChild(eventsCardContainer);


        //  -----------------------------------     EVENTS CONTAINER MODIFIER     -------------------------------- //

        // Si a la vez que se visualiza el hero también hay un events container debajo, vamos a darle margen suficiente para que quepa
        console.log(eventsContainer);


        var heroContainerPreviousHeight
        // Funcion de ajustarle el margin top al eventsContainer para que se ubique debajo del hero.
        const eventsContainerMarginTop = () => {
            console.log('Modificando events container margin top')
            const heroContainer = document.querySelector('.hero-container');
            const heroContainerActualHeight = heroContainer.offsetHeight;
            console.log(heroContainer);
            const headerHeight = document.querySelector('header').offsetHeight;
            console.log(headerHeight);
            const headerAndHeroHeight = heroContainerActualHeight + headerHeight;
            const scrollPosition = window.scrollY;

            console.log(scrollPosition);
            if(heroContainerActualHeight < heroContainerPreviousHeight){
                console.log('Estas scrolleando hacia abajo');
                eventsContainer.style.marginTop = `${headerAndHeroHeight+scrollPosition}px`;
            }else if(heroContainerActualHeight > heroContainerPreviousHeight){
                console.log('Estas scrolleando hacia arriba')
                eventsContainer.style.marginTop = `${headerAndHeroHeight+scrollPosition}px`;
            }

            heroContainerPreviousHeight= heroContainerActualHeight
        }

        //Fijar el contenedor de filtros, si es que hay hero, en relacion al scroll.
        const filtersContainerFixed = () =>{
            const searchEventsFiltersContainer = document.querySelector('#search-events-filters-container');
            console.log(searchEventsFiltersContainer)
            if(searchEventsFiltersContainer){
                const heroContainerHeight = document.querySelector('.hero-container').offsetHeight;
                searchEventsFiltersContainer.style.marginTop =searchEventsFiltersContainer.offsetTop + heroContainerHeight + 'px';
                console.log(searchEventsFiltersContainer.style.marginTop)
            }
        }

        // Que eventsContainerMarginTop se ejecute solo si está cargado eventsContainer, y si hay tambien heroContainer visualizandose.
        window.addEventListener('scroll', () => {
            const heroContainer = document.querySelector('.hero-container');
            if (eventsContainer && heroContainer) {
                eventsContainerMarginTop();
                //filtersContainerFixed();
            }
        });


        // Agregar el contenedor de eventos al DOM
        return eventsContainer;

    } catch (error) {
        console.error('Error al mostrar los eventos:', error.message);
    }
};