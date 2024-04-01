import './header.css'
import { createLoginForm } from "../../users/loginForm/loginForm";
import { createRegistrationForm } from "../../users/registrationForm/registrationForm";
import { createProfile } from "../../users/profile/profile";
import { showEvents } from "../../eventss/events/events";
import { home } from "../home/home";
import { onClickHandler } from '../../../utils/onClickHandler';


export const createHeader = () => {
    const isAuthenticated = localStorage.getItem("userId") && localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");

    const header = document.createElement("header");
    header.innerHTML = `
        <ul id="header-list">
            <li id="header-home-link-container" class="header-list-link link-container">
                <a id="home-link">Home</a>
            </li>
            ${!isAuthenticated ? `
                <li id="header-login-link-container" class="header-list-link link-container">
                    <a id="login-link">Login</a>
                </li>
            ` : ''}
            <!--<li id="header-events-link-container" class="header-list-link link-container">
                <a id="header-events-link">Eventos</a>
            </li>-->
            ${isAuthenticated ? `
                <li id="header-profile-link-container" class="header-list-link link-container">
                    <a id="header-profile-link">${userName}</a>
                </li>
            ` : ''}
        </ul>
    `;

    // Agregar event listeners
    header.querySelector("#home-link").addEventListener("click", () => onClickHandler("#app", home));

    if (!isAuthenticated) {
        header.querySelector("#login-link").addEventListener("click", () => onClickHandler("#main-container", createLoginForm));
    }

    //header.querySelector("#header-events-link").addEventListener("click", () => onClickHandler("#main-container", showEvents));

    if (isAuthenticated) {
        header.querySelector("#header-profile-link").addEventListener("click", () => onClickHandler("#main-container", createProfile));
    }

    return header;
}
