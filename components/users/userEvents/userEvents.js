import { ShowEventList } from '../../eventss/showEventList/showEventList.js';
import './userEvents.css'

export function UserEvents(events, eventType, eventsContainerTitle, alt='No hay eventos en esta lista') {

    if(events.length==0){
        //Si no hay eventis en la lista, mostrar su alt
        const noEvents = document.createElement('h4');
        noEvents.textContent = alt;
        return noEvents;
    }else{
        const userEventsList = document.createElement('div');
        userEventsList.classList.add('user-events-container');
        userEventsList.id = eventType+'-container';
    
        userEventsList.innerHTML = `
            <h2>${eventsContainerTitle}:</h2>
            <div id="${eventType}-list" class="user-events-list">
                ${ShowEventList(events)}
            </div>
        `;
    
        return userEventsList;
    }
}