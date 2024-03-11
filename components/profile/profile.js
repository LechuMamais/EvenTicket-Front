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


            const createNewEventButton = document.createElement("button");
            createNewEventButton.textContent = "Crear Nuevo Evento";
            createNewEventButton.addEventListener("click", () => {
                const mainContainer = document.querySelector('#main-container');
                mainContainer.innerHTML = "";
                mainContainer.appendChild(createNewEventForm());
            });

            const showEventsButton = document.createElement("button");
            showEventsButton.textContent = "Ver eventos disponibles";
            showEventsButton.addEventListener("click", async () => {
                const mainContainer = document.querySelector("#main-container");
                mainContainer.innerHTML = "";
                const eventsComponent = await showEvents();
                if (eventsComponent) {
                    mainContainer.appendChild(eventsComponent);
                }
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
            const userOptionsContainer = document.createElement('div');
            userOptionsContainer.id = "user-options-container";
            userOptionsContainer.appendChild(updateProfileButton);
            userOptionsContainer.appendChild(logOutButton);
            userInfoContainer.appendChild(userOptionsContainer);


            const userEventsAsOrganizerContainer = document.querySelector('#user-events-as-organizer-container');
            // Si la lista está vacia indicarlo en un texto
            if (userData.eventsAsOrganizer.length === 0) {
                const noEventsAsOrganizer = document.createElement('h4');
                noEventsAsOrganizer.textContent = 'No tienes eventos organizados!';
                userEventsAsOrganizerContainer.appendChild(noEventsAsOrganizer);
            }
            userEventsAsOrganizerContainer.appendChild(createNewEventButton);

            const userEventsAsAssistantContainer = document.querySelector('#user-events-as-assistant-container');
            // Si la lista está vacia indicarlo en un texto
            if (userData.eventsAsAttendee.length === 0) {
                const noEventsAsAttendee = document.createElement('h4');
                noEventsAsAttendee.textContent = 'Aún no tienes eventos en tu calendario!';
                userEventsAsAssistantContainer.appendChild(noEventsAsAttendee);
            }
            userEventsAsAssistantContainer.appendChild(showEventsButton);

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
            alert("Error al obtener la información del usuario");
        }
    }
};