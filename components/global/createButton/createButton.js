import './createButton.css'

export const createButton = (text, onClickHandler, options = {}) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClickHandler);
    
    // Agregar atributos HTML adicionales si se proporcionan en el objeto de opciones
    Object.keys(options).forEach(key => {
        button.setAttribute(key, options[key]);
    });

    //Agregamos clase generica a todos los buttons
    button.classList.add("button");

    return button;
};
