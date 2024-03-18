import "./header.css";
import { createLoginForm } from "../loginForm/loginForm";
import { createRegistrationForm } from "../registrationForm/registrationForm";
import { createProfile } from "../profile/profile";
import { showEvents } from "../events/events";
import { home } from "../home/home";

export const createHeader = () => {
    const userName = localStorage.getItem("userName");

    const header = document.createElement("header");
    header.innerHTML = `
        <ul id="header-list">
            <li id="header-home-link-container" class="header-list-link link-container">
                <a id="home-link">Home</a>
            </li>
            <li id="header-login-link-container" class="header-list-link link-container">
                <a id="login-link">Login</a>
            </li>
            <li id="header-register-link-container" class="header-list-link link-container">
                <a id="header-register-link">Register</a>
            </li>
            <li id="header-events-link-container" class="header-list-link link-container">
                <a id="header-events-link">Eventos</a>
            </li>
            <li id="header-profile-link-container" class="header-list-link link-container">
                <a id="header-profile-link">${userName}</a>
            </li>
        </ul>
    `;

    // Agregar event listeners
    const homeLink = header.querySelector("#home-link");
    homeLink.addEventListener("click", () => {
        const divApp = document.querySelector("#app");
        divApp.innerHTML = "";
        divApp.appendChild(home());
    });

    const loginLink = header.querySelector("#login-link");
    loginLink.addEventListener("click", () => {
        const mainContainer = document.querySelector("#main-container");
        mainContainer.innerHTML = "";
        mainContainer.appendChild(createLoginForm());
    });

    const registerLink = header.querySelector("#header-register-link");
    registerLink.addEventListener("click", () => {
        const mainContainer = document.querySelector("#main-container");
        mainContainer.innerHTML = "";
        mainContainer.appendChild(createRegistrationForm());
    });

    const eventsLink = header.querySelector("#header-events-link");
    eventsLink.addEventListener("click", async () => {
        const mainContainer = document.querySelector("#main-container");
        mainContainer.innerHTML = "";
        const eventsComponent = await showEvents();
        if (eventsComponent) {
            mainContainer.appendChild(eventsComponent);
        }
    });


    const profileLink = header.querySelector("#header-profile-link");
    profileLink.addEventListener("click", async () => {
        const mainContainer = document.querySelector("#main-container");
        mainContainer.innerHTML = "";
        const profileComponent = await createProfile();
        if (profileComponent) {
            mainContainer.appendChild(profileComponent);
        }
    });

    // Si esta logueado, no mostrar register ni login:
    // Obtener la información del usuario
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    const isAuthenticated = userId && accessToken;
    if (isAuthenticated) {
        header.querySelector("#header-login-link-container").style.display = "none";
        header.querySelector("#header-register-link-container").style.display = "none";
    }

    // Si no esta logueado, no mostrar el perfil

    if (!isAuthenticated) {
        header.querySelector("#header-profile-link-container").style.display = "none";
    }

    return header; // Devuelve el elemento del header
}
