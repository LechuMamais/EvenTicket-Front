import { updateProfile } from '../../../utils/users/updateProfile';
import './updateProfileForm.css'

export const updateProfileForm = (userData) => {
    window.scrollTo({ top: 0 }); // Asegurarnos de que el scroll esté arriba del todo en la pag
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

        updateProfile(userId, formData);
    });

    return form;
};