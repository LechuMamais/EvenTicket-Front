// Acá están todas las urls que usamos en los fetch para comunicar con la base de datos.

export const BASE_URL = 'http://localhost:3000/api';

export const EVENTS_URL = `${BASE_URL}/events`;
export const NEW_EVENTS_URL = `${EVENTS_URL}/newEvent`;

export const USERS_URL = `${BASE_URL}/users`;
export const REGISTER_URL = `${USERS_URL}/register`;
export const LOGIN_URL = `${USERS_URL}/login`;