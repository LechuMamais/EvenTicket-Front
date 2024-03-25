import { makeRequest } from "../../../utils/api";
import { REGISTER_URL } from "../../../utils/apiUrls";
import { createLoginForm } from "../loginForm/loginForm";
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
        
        <button type="submit">Registrarse</button>
    `;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            userName: form.querySelector("#userName").value,
            email: form.querySelector("#email").value,
            password: form.querySelector("#password").value
        };

        try {

            const response = await makeRequest(REGISTER_URL, 'POST', formData)

            if (!response) {
                throw new Error("Error al registrar usuario");
            }

            const data = response;

            // Acá ya sería saltar al login, y rescatar la informacion.
            const mainContainer = document.querySelector("#main-container");
            mainContainer.innerHTML = "";
            mainContainer.appendChild(createLoginForm(data.userName));
        } catch (error) {
            console.error("Error al registrar usuario:", error.message);
            alert("Error al registrar usuario");
        }
    });

    const registrationFormContainer = document.createElement('div');
    registrationFormContainer.id ='registration-form-container';
    registrationFormContainer.appendChild(form);
    return registrationFormContainer;
}
