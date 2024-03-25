import './updateProfileForm.css'
import { createProfile } from "../profile/profile";
import { USERS_URL } from '../../../utils/apiUrls';
import { makeRequest } from '../../../utils/api';

export const updateProfileForm = (userData) => {
    // Obtener el userId y el accessToken guardados en localStorage
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    const form = document.createElement("form");
    form.id = "update-profile-form";

    // Rellenar el formulario con los datos actuales del usuario
    form.innerHTML = `
            <h2>Actualizar Perfil</h2>
            <label for="userName">Nombre de Usuario:</label><br>
            <input type="text" id="username" name="userName" value="${userData.userName}" required><br>
            
            <label for="email">Correo Electrónico:</label><br>
            <input type="email" id="email" name="email" value="${userData.email}" required><br>
            
            <button type="submit">Actualizar Perfil</button>
        `;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            userName: form.querySelector("#username").value,
            email: form.querySelector("#email").value,
            accessToken: accessToken
        };

        try {

            const response = await makeRequest(`${USERS_URL}/${userId}`, 'PUT', formData)

            if (!response) {
                throw new Error("Error al actualizar el perfil");
            }

            alert("Perfil actualizado correctamente");
            
            // Actualizado el perfil, lo volvemos a mostrar
            window.location.reload();
        } catch (error) {
            console.error("Error al actualizar el perfil:", error.message);
            alert("Error al actualizar el perfil");
        }
    });

    return form;
};