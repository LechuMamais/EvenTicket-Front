import { giveHeaderHomeTitleInitialStyles } from "./giveHeaderHomeTitleInitialStyles";

// Función para manejar eventos de clic comunes.
// La aplicaremos al header, y a los buttons.

export const onClickHandler = async (targetContainer, component) => {
    const componentContainer = document.querySelector(targetContainer);
    componentContainer.innerHTML = "";
    const componentToAdd = await component();
    if (componentToAdd) {
        componentContainer.appendChild(componentToAdd);
    }
    // Llamamos a la función que le da los estilos iniciales al header
    giveHeaderHomeTitleInitialStyles(component);
};