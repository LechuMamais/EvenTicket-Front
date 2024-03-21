// Acá están todas las urls que usamos en los fetch para comunicar con la base de datos.

export const BASE_URL = 'http://even-ticket-j1bwy96gt-lechumamais-projects.vercel.app';
// Local: 'http://localhost:3000'

export const EVENTS_URL = `${BASE_URL}/events`;
export const NEW_EVENTS_URL = `${EVENTS_URL}/newEvent`;
export const MANAGE_ASSISTANCE_URL = `${BASE_URL}/manageAssistance`;

export const USERS_URL = `${BASE_URL}/users`;
export const REGISTER_URL = `${USERS_URL}/register`;
export const LOGIN_URL = `${USERS_URL}/login`;
export const CHECK_LOGGED_URL = `${USERS_URL}/checkLogged`;

export const ADD_ASSISTANCE_URL = `${MANAGE_ASSISTANCE_URL}/addAssistance`;
export const REMOVE_ASSISTANCE_URL = `${MANAGE_ASSISTANCE_URL}/removeAssistance`;