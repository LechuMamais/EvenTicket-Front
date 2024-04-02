import { onClickHandler } from "../../../utils/onClickHandler";
import { login } from "../../../utils/users/login";
import { createRegistrationForm } from "../registrationForm/registrationForm"; // Importa la función para crear el formulario de registro
import "./loginForm.css";

export const createLoginForm = (userName = '') => {
    localStorage.clear();
    const form = document.createElement("form");
    form.id = "login-form";
    form.setAttribute("autocomplete", "on");
    form.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <label for="userName">Nombre de usuario:</label>
        <input type="text" id="userName" name="userName" value="${userName}">
        
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password">
        
        <button id="submit-button" class="button-big button" type="submit">Iniciar Sesión</button>
        <button id="register-button">¿No te has registrado?</button> <!-- Botón de registro -->
    `;

    // Evento para el botón de registro
    const registerButton = form.querySelector("#register-button");
    registerButton.addEventListener("click", () => {
        onClickHandler("#main-container", createRegistrationForm)
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = {
            userName: form.querySelector("#userName").value,
            password: form.querySelector("#password").value
        };
        login(formData);
    });

    const formContainer = document.createElement("div");
    formContainer.id = "login-form-container";
    formContainer.appendChild(form);

    return formContainer;
}
