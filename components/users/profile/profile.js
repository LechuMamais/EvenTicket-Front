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

export const createProfile = async () => {
    window.scrollTo({ top: 0 }); // Asegurarnos de que el scroll esté arriba del todo en la pag
    const userId = localStorage.getItem("userId");

    const mainContainer = document.querySelector("#main-container");
    if (userId == null) {
        mainContainer.innerHTML = "";
        mainContainer.appendChild(createLoginForm());
        return
    }
    try {
        const userData = await getUserData(userId);

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

        const showFutureEventsAsOrganizer = UserEvents(
            futureOrganizedEvents,
            'future-events-as-organizer',
            'Eventos que estás organizando',
            'No estás organizando ningún evento.');
        const showPastEventsAsOrganizer = UserEvents(
            pastOrganizedEvents,
            'past-events-as-organizer',
            'Eventos que has organizado',
            '');
        userEventsAsOrganizerContainer.appendChild(showFutureEventsAsOrganizer);
        userEventsAsOrganizerContainer.appendChild(showPastEventsAsOrganizer);

        const createNewEventButton = createButton("Crear Nuevo evento", () => {
            onClickHandler('#main-container', () => createNewEventForm())
        }, { id: "create-new-event-button", class: "button-primary" });

        userEventsAsOrganizerContainer.appendChild(createNewEventButton);

        userEventsContainer.appendChild(userEventsAsOrganizerContainer);


        // -------------------------------- EVENTOS COMO ASISTENTE --------------------------------

        const userEventsAsAssistantContainer = document.createElement('div');
        userEventsAsAssistantContainer.id = 'user-events-as-assistant-container';

        const showFutureEventsAsAttendee = UserEvents(
            futureAssistantEvents,
            'future-events-as-assistant',
            'Eventos a los que asistirás',
            'Aún no tienes eventos en tu calendario!');
        const showPastEventsAsAttendee = UserEvents(
            pastAssistantEvents,
            'past-events-as-organizer',
            'Eventos a los que haz asistido',
            '');
        userEventsAsAssistantContainer.appendChild(showFutureEventsAsAttendee);
        userEventsAsAssistantContainer.appendChild(showPastEventsAsAttendee);

        const showEventsButton = createButton("Ver eventos disponibles", () => {
            onClickHandler('#main-container', () => showEvents())
        }, { id: "show-events-button", class: "button-primary" });

        userEventsAsAssistantContainer.appendChild(showEventsButton);
        userEventsContainer.appendChild(userEventsAsAssistantContainer);

        profileContainer.appendChild(userEventsContainer);

        // Que cada eventCard, al darle click, lleve a su eventDetails component 
        const eventButtons = document.querySelectorAll(".event-card");
        eventButtons.forEach(button => {
            button.addEventListener("click", () => {
                const eventId = button.dataset.eventId;
                mainContainer.innerHTML = "";
                showEventDetails(eventId);
            });
        });

        // Mostrar la inforemación del usuario, y los botones updateProfile y logOut
        profileContainer.appendChild(UserInfo(userData));

        //Finalmente mostrar en mainContainer el perfil del usuario
        mainContainer.innerHTML = "";
        mainContainer.appendChild(profileContainer);
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error.message);
        showNotification("Error al mostrar el perfil del usuario", "error");
    }
};