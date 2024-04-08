import './header.css'
import { createLoginForm } from "../../users/loginForm/loginForm";
import { createProfile } from "../../users/profile/profile";
import { home } from "../home/home";
import { onClickHandler } from '../../../utils/onClickHandler';
//import { showEvents } from "../../eventss/events/events";



export const createHeader = () => {
    const isAuthenticated = localStorage.getItem("userId") && localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");

    const header = document.createElement("header");
    header.innerHTML = `
        <ul id="header-list">
            <li id="header-home-link-container" class="header-list-link link-container">
                <a id="home-link">INSOMNIA</a>
            </li>
            ${!isAuthenticated ? `
                <li id="header-login-link-container" class="header-list-link link-container right-header-link">
                    <a id="login-link"><i class="bi bi-box-arrow-in-right"></i></a>
                </li>
            ` : ''}
            ${isAuthenticated ? `
                <li id="header-profile-link-container" class="header-list-link link-container right-header-link">
                    <a id="header-profile-link"><i class="bi bi-person"></i></a>
                </li>
            ` : ''}
        </ul>
    `;
    header.style.backgroundImage = ''; // Vacía el fondo del header

    // Agregamos event listeners
    header.querySelector("#home-link").addEventListener("click", () => onClickHandler("#main-container", home));

    if (!isAuthenticated) {
        header.querySelector("#login-link").addEventListener("click", () => onClickHandler("#main-container", createLoginForm));
    }

    if (isAuthenticated) {
        header.querySelector("#header-profile-link").addEventListener("click", () => onClickHandler("#main-container", createProfile));
    }



    return header;
}
