import { onClickHandler } from '../../../utils/onClickHandler';
import { createButton } from '../../global/createButton/createButton';
import { updateProfileForm } from '../updateProfileForm/updateProfileForm';
import './userInfo.css';

export function UserInfo(userData) {
    const userInfoContainer = document.createElement('div');
    userInfoContainer.id = 'user-info-container';
    userInfoContainer.innerHTML = `
            <div id="user-name-email">
                <h2>${userData.userName}</h2>
                <p>(${userData.email})</p>
            </div>
    `;

    const updateProfileButton = createButton("Actualizar perfil", () => {
        onClickHandler('#main-container', () => updateProfileForm(userData))
    }, { id: "update-profile-button", class: "button-primary" });

    const logOutButton = createButton("logOut", () => {
        localStorage.clear();
        window.location.reload();
    }, { id: "logOut-button", class: "button-primary" });

    const userOptionsContainer = document.createElement('div');
    userOptionsContainer.id = "user-options-container";
    userOptionsContainer.appendChild(updateProfileButton);
    userOptionsContainer.appendChild(logOutButton);
    userInfoContainer.appendChild(userOptionsContainer);

    return userInfoContainer;
}