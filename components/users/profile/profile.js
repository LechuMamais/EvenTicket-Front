import './profile.css'

import { updateProfileForm } from "../updateProfileForm/updateProfileForm";
import { showEventDetails } from "../../eventss/eventDetails/eventDetails";
import { createLoginForm } from '../loginForm/loginForm';
import { showEvents } from '../../eventss/events/events';
import { ShowEventList } from '../../eventss/showEventList/showEventList';
import { createNewEventForm } from '../../eventss/createNewEventForm/createNewEventForm';
import { onClickHandler } from '../../../utils/onClickHandler';
import { createButton } from '../../global/createButton/createButton';
import { showNotification } from '../../global/showNotification/showNotification';
import { getUserData } from '../../../utils/users/getUserData';

export const createProfile = async () => {
    window.scrollTo({ top: 0 }); // Asegurarnos de que el scroll esté arriba del todo en la pag
    const userId = localStorage.getItem("userId");

    if (userId == null) {
        const mainContainer = document.querySelector("#main-container");
        mainContainer.innerHTML = "";
        mainContainer.appendChild(createLoginForm());
    } else {
        try {
            const userData = await getUserData(userId);

            const profileContainer = document.createElement("div");
            profileContainer.id = "profile-container";
            profileContainer.innerHTML = `
            <div id="user-events-container">
                <div id="user-events-as-organizer-container">
                    <h2 id="text-events-as-organizer">Eventos que estás organizando:</h2>
                    <div id="events-as-organizer-list">
                    ${ShowEventList(userData.eventsAsOrganizer)}
                    </div>
                </div>
                <div id="user-events-as-assistant-container">
                    <h2 id="text-events-as-assistant">Eventos a los que asistirás:</h2>
                    <div id="events-as-assistant-list">
                    ${ShowEventList(userData.eventsAsAttendee)}
                    </div>
                </div>
            </div>
            <div id="user-info-container">
                <div id="user-name-email">
                    <h2>${userData.userName}</h2>
                    <p>(${userData.email})</p>
                </div>
            </div>
            `;

            const showEventsButton = createButton("Ver eventos disponibles", () => {
                onClickHandler('#main-container', () => showEvents())
            }, { id: "show-events-button", class: "button-primary" });

            const updateProfileButton = createButton("Actualizar perfil", () => {
                onClickHandler('#main-container', () => updateProfileForm(userData))
            }, { id: "update-profile-button", class: "button-primary" });

            const logOutButton = createButton("logOut", () => {
                localStorage.clear();
                window.location.reload();
            }, { id: "logOut-button", class: "button-primary" });

            const mainContainer = document.querySelector('#main-container');
            mainContainer.innerHTML = "";
            mainContainer.appendChild(profileContainer);

            const userInfoContainer = document.querySelector('#user-info-container');
            const userOptionsContainer = document.createElement('div');
            userOptionsContainer.id = "user-options-container";
            userOptionsContainer.appendChild(updateProfileButton);
            userOptionsContainer.appendChild(logOutButton);
            userInfoContainer.appendChild(userOptionsContainer);

            // -------------------------------- EVENTOS COMO ORGANIZADOR --------------------------------

            const userEventsAsOrganizerContainer = document.querySelector('#user-events-as-organizer-container');
            // Si la lista está vacia indicarlo en un texto
            if (userData.eventsAsOrganizer.length === 0) {
                const eventsAsOrganizerList = document.getElementById('events-as-organizer-list');
                eventsAsOrganizerList.style.display = 'none';
                const noEventsAsOrganizer = document.createElement('h4');
                noEventsAsOrganizer.textContent = 'No estás organizando ningún evento.';
                userEventsAsOrganizerContainer.appendChild(noEventsAsOrganizer);
            }

            const createNewEventButton = createButton("Crear Nuevo evento", () => {
                onClickHandler('#main-container', () => createNewEventForm())
            }, { id: "create-new-event-button", class: "button-primary" });

            userEventsAsOrganizerContainer.appendChild(createNewEventButton);

            // -------------------------------- EVENTOS COMO ASISTENTE --------------------------------
            const userEventsAsAssistantContainer = document.querySelector('#user-events-as-assistant-container');
            // Si la lista está vacia indicarlo en un texto
            if (userData.eventsAsAttendee.length === 0) {
                const eventsAsAssistantList = document.getElementById('events-as-assistant-list');
                eventsAsAssistantList.style.display = 'none';
                const noEventsAsAttendee = document.createElement('h4');
                noEventsAsAttendee.textContent = 'Aún no tienes eventos en tu calendario!';
                userEventsAsAssistantContainer.appendChild(noEventsAsAttendee);
            }
            userEventsAsAssistantContainer.appendChild(showEventsButton);

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
    }
};