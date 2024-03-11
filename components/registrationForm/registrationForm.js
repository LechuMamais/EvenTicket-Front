import { REGISTER_URL } from "../../utils/apiUrls";
import { createLoginForm } from "../loginForm/loginForm";
import "./registrationForm.css";

export const createRegistrationForm = () => {
    const form = document.createElement("form");
    form.id = "registration-form";
    form.innerHTML = `
        <h2>Registro de Usuario</h2>
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
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error al registrar usuario");
            }

            const data = await response.json();

            // Acá ya sería saltar al login, y rescatar la informacion.
            createLoginForm(data.email)
            /*form.reset();*/
        } catch (error) {
            console.error("Error al registrar usuario:", error.message);
            alert("Error al registrar usuario");
        }
    });

    return form;
}
