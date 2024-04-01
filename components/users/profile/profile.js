import './profile.css'

import { showEventDetails } from "../../eventss/eventDetails/eventDetails";
import { createLoginForm } from '../loginForm/loginForm';
import { showEvents } from '../../eventss/events/events';
import { createNewEventForm } from '../../eventss/createNewEventForm/createNewEventForm';
import { onClickHandler } from '../../../utils/onClickHandler';
import { createButton } from '../../global/createButton/createButton';
import { showNotification } from '../../global/showNotification/showNotification';
import { getUserData } from '../../../utils/users/getUserData';
import { UserInfo } from '../userInfo/userInfo';
import { UserEvents } from '../userEvents/userEvents';

// Mostrar el perfil de un usuario. Recibe el id del usuario a mostrar, pero si no lo recibe, será userId
export const createProfile = async (profileId = '') => {
    window.scrollTo({ top: 0 }); // Asegurarnos de que el scroll esté arriba del todo en la pag
    const userId = localStorage.getItem("userId");
    const mainContainer = document.querySelector("#main-container");
    if (userId == null) {
        mainContainer.innerHTML = "";
        mainContainer.appendChild(createLoginForm());
        return
    }
    try {
        // Necesitamos saber si se trata del perfil propio, o del de otro usuario.
        var ownProfile = false;
        if (profileId == '') {
            profileId = userId
            ownProfile = true;
        };
        const userData = await getUserData(profileId);

        // Obtener la fecha actual
        const currentDate = new Date();

        // Filtrar los eventos pasados y futuros
        const pastOrganizedEvents = userData.eventsAsOrganizer.filter(event => new Date(event.date) < currentDate);
        const futureOrganizedEvents = userData.eventsAsOrganizer.filter(event => new Date(event.date) >= currentDate);
        const pastAssistantEvents = userData.eventsAsAttendee.filter(event => new Date(event.date) < currentDate);
        const futureAssistantEvents = userData.eventsAsAttendee.filter(event => new Date(event.date) >= currentDate);

        const profileContainer = document.createElement("div");
        profileContainer.id = "profile-container";
        const userEventsContainer = document.createElement('div');
        userEventsContainer.id = 'user-events-container';


        // -------------------------------- EVENTOS COMO ORGANIZADOR --------------------------------

        const userEventsAsOrganizerContainer = document.createElement('div');
        userEventsAsOrganizerContainer.id = 'user-events-as-organizer-container';


        // Los títulos de las listas serán distintas si se trata del perfil propio, o de otro usuario
        // por eso los definimos afuera

        var eventsListTitles;
        if (ownProfile) {
            eventsListTitles = {
                futureEventsAsOrganizerTitle: 'Eventos que estás organizando',
                noEventsAsOrganizerText: 'No estás organizando ningún evento.',
                pastEventsAsOrganizerTitle: 'Eventos que has organizado',
                futureEventsAsAttendeeTitle: 'Eventos a los que asistirás',
                noEventsAsAttendeeText: 'Aún no tienes eventos en tu calendario!',
                pastEventsAsAttendeeTitle: 'Eventos a los que haz asistido'
            };
        } else {
            eventsListTitles = {
                futureEventsAsOrganizerTitle: `Futuros eventos de ${userData.userName}`,
                noEventsAsOrganizerText: `${userData.userName} no está organizando ningún evento.`,
                pastEventsAsOrganizerTitle: `Eventos que ha organizado ${userData.userName}`,
                futureEventsAsAttendeeTitle: 'Eventos a los que asistirá',
                noEventsAsAttendeeText: `${userData.userName} no tiene eventos en tu calendario.`,
                pastEventsAsAttendeeTitle: 'Eventos a los que ha asistido'
            };
        }

        const showFutureEventsAsOrganizer = UserEvents(
            futureOrganizedEvents,
            'future-events-as-organizer',
            eventsListTitles.futureEventsAsOrganizerTitle,
            eventsListTitles.noEventsAsOrganizerText
        );
        const showPastEventsAsOrganizer = UserEvents(
            pastOrganizedEvents,
            'past-events-as-organizer',
            eventsListTitles.pastEventsAsOrganizerTitle,
            ''
        );

        userEventsAsOrganizerContainer.appendChild(showFutureEventsAsOrganizer);
        userEventsAsOrganizerContainer.appendChild(showPastEventsAsOrganizer);

        // Sólo si estamos en el perfil propio mostramos el boton de crear nuevo evento.
        if (ownProfile) {
            const createNewEventButton = createButton("Crear Nuevo evento", () => {
                onClickHandler('#main-container', () => createNewEventForm())
            }, { id: "create-new-event-button", class: "button-primary" });

            userEventsAsOrganizerContainer.appendChild(createNewEventButton);
        }

        userEventsContainer.appendChild(userEventsAsOrganizerContainer);


        // -------------------------------- EVENTOS COMO ASISTENTE --------------------------------

        const userEventsAsAssistantContainer = document.createElement('div');
        userEventsAsAssistantContainer.id = 'user-events-as-assistant-container';

        const showFutureEventsAsAttendee = UserEvents(
            futureAssistantEvents,
            'future-events-as-assistant',
            eventsListTitles.futureEventsAsAttendeeTitle,
            eventsListTitles.noEventsAsAttendeeText
        );
        const showPastEventsAsAttendee = UserEvents(
            pastAssistantEvents,
            'past-events-as-organizer',
            eventsListTitles.pastEventsAsAttendeeTitle,
            ''
        );

        userEventsAsAssistantContainer.appendChild(showFutureEventsAsAttendee);
        userEventsAsAssistantContainer.appendChild(showPastEventsAsAttendee);

        const showEventsButton = createButton("Más eventos disponibles", () => {
            onClickHandler('#main-container', () => showEvents())
        }, { id: "show-events-button", class: "button-primary" });

        userEventsAsAssistantContainer.appendChild(showEventsButton);
        userEventsContainer.appendChild(userEventsAsAssistantContainer);

        profileContainer.appendChild(userEventsContainer);

        // Mostrar la inforemación del usuario, y los botones updateProfile y logOut
        profileContainer.appendChild(UserInfo(userData));

        //Finalmente mostrar en mainContainer el perfil del usuario
        mainContainer.innerHTML = "";
        mainContainer.appendChild(profileContainer);

        // Que cada eventCard, al darle click, lleve a su eventDetails component 
        const eventButtons = document.querySelectorAll(".event-card");
        eventButtons.forEach(button => {
            button.addEventListener("click", () => {
                const eventId = button.dataset.eventId;
                mainContainer.innerHTML = "";
                showEventDetails(eventId);
            });
        });
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error.message);
        showNotification("Error al mostrar el perfil del usuario", "error");
    }
};