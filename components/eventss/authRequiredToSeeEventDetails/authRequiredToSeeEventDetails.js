import { onClickHandler } from '../../../utils/onClickHandler';
import { createLoginForm } from '../../users/loginForm/loginForm';
import { createRegistrationForm } from '../../users/registrationForm/registrationForm';
import './authRequiredToSeeEventDetails.css'

export const authRequiredToSeeEventDetails = () => {
    const authRequired = document.createElement('div');
    authRequired.id = 'auth-required';
    const authRequiredH4 = document.createElement('h4');
    authRequiredH4.textContent = 'Inicia sesión para ver los detalles del evento';
    const authRequiredP = document.createElement('p');
    authRequiredP.textContent = '¿No estás registrado? Hazlo aqui';
    authRequiredH4.addEventListener('click', () => {
        onClickHandler('#main-container', () => createLoginForm(''))
    })
    authRequiredP.addEventListener('click', () => {
        onClickHandler('#main-container', () => createRegistrationForm(''))
    })

    authRequired.appendChild(authRequiredH4);
    authRequired.appendChild(authRequiredP);
    return authRequired;
}