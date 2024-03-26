import { register } from "../../../utils/users/register";

import "./registrationForm.css";

export const createRegistrationForm = () => {
    const form = document.createElement("form");
    form.id = "registration-form";
    form.innerHTML = `
        <h2>Crear Usuario</h2>
        <label for="userName">Nombre de usuario:</label><br>
        <input type="text" id="userName" name="userName"><br>
        
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email"><br>
        
        <label for="password">Contraseña:</label><br>
        <input type="password" id="password" name="password"><br>

        <label for="password">Repite la contraseña:</label><br>
        <input type="password" id="password-repeat" name="password-repeat"><br>
        
        <button type="submit">Registrarse</button>
    `;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            userName: form.querySelector("#userName").value,
            email: form.querySelector("#email").value,
            password: form.querySelector("#password").value,
            passwordRepeat: form.querySelector("#password-repeat").value
        };

        register(formData);
    });

    const registrationFormContainer = document.createElement('div');
    registrationFormContainer.id ='registration-form-container';
    registrationFormContainer.appendChild(form);
    return registrationFormContainer;
}
