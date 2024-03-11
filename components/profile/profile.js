import './profile.css'


import { createNewEventForm } from "../createNewEventForm/createNewEventForm";
import { updateProfileForm } from "../updateProfileForm/updateProfileForm"; 
import { showEventDetails } from "../eventDetails/eventDetails";
import { createLoginForm } from '../loginForm/loginForm';
import { USERS_URL } from '../../utils/apiUrls';
import { showEvents } from '../events/events';
import { ShowEventList } from '../showEventList/showEventList';

export const createProfile = async () => {
    const userId = localStorage.getItem("userId");

    if (userId == null) {
        const mainContainer = document.querySelector("#main-container");
        mainContainer.innerHTML = "";
        mainContainer.appendChild(createLoginForm());
    } else {
        try {
            const response = await fetch(`${USERS_URL}/${userId}`);

            if (!response.ok) {
                throw new Error("Error al obtener la información del usuario");
            }

            const userData = await response.json();

            const profileContainer = document.createElement("div");
            profileContainer.id = "profile-container";
            profileContainer.innerHTML = `
            
            <div id="user-info-container">
                <div id="user-name-email">
                    <h2><strong>${userData.userName}</strong></h2>
                    <p>(${userData.email})</p>
                </div>
            </div>
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
            `;
            
            const createNewEventButton = document.createElement("button");
            createNewEventButton.textContent = "Crear Nuevo Evento";
            createNewEventButton.addEventListener("click", () => {
                const mainContainer = document.querySelector('#main-container');
                mainContainer.innerHTML = "";
                mainContainer.appendChild(createNewEventForm());
            });
            
            const showEventsButton = document.createElement("button");
            showEventsButton.textContent = "Ver eventos disponibles";
            showEventsButton.addEventListener("click", () => {
                const mainContainer = document.querySelector('#main-container');
                mainContainer.innerHTML = "";
                mainContainer.appendChild(showEvents());
            });
            
            const updateProfileButton = document.createElement("button");
            updateProfileButton.textContent = "Actualizar perfil";
            updateProfileButton.addEventListener("click", () => {
                const mainContainer = document.querySelector('#main-container');
                mainContainer.innerHTML = "";
                mainContainer.appendChild(updateProfileForm(userData));
            });
            
            const logOutButton = document.createElement("button");
            logOutButton.textContent = "logOut";
            logOutButton.id = "logOut-button";
            logOutButton.addEventListener("click", () => {
                localStorage.clear();
                window.location.reload();
            });
            
            const mainContainer = document.querySelector('#main-container');
            mainContainer.innerHTML = "";
            mainContainer.appendChild(profileContainer);
            
            const userInfoContainer = document.querySelector('#user-info-container');
            userInfoContainer.appendChild(updateProfileButton);
            userInfoContainer.appendChild(logOutButton);
            
            const userEventsAsOrganizerContainer = document.querySelector('#user-events-as-organizer-container');
            userEventsAsOrganizerContainer.appendChild(createNewEventButton);
            
            const userEventsAsAssistantContainer = document.querySelector('#user-events-as-assistant-container')
            userEventsAsAssistantContainer.appendChild(showEventsButton);
            
            const eventButtons = document.querySelectorAll(".event-button");
            eventButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const eventId = button.dataset.eventId;
                    showEventDetails(eventId);
                });
            });

        } catch (error) {
            console.error("Error al obtener la información del usuario:", error.message);
            alert("Error al obtener la información del usuario");
        }
    }
};