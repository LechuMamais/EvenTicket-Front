import './heroContent.css';

export function heroContainer() {
    // Crear contenedor principal del héroe
    const heroContainer = document.createElement('div');
    heroContainer.classList.add('hero-container');

    // Crear héroe con imagen de fondo
    const hero = document.createElement('div');
    hero.classList.add('hero');
    heroContainer.appendChild(hero);

    // Crear título INSOMNIA
    const title = document.createElement('h1');
    title.textContent = 'EVENTICKET';
    title.classList.add('hero-title');
    hero.appendChild(title);

    // Calcular la altura inicial del héroe
    const viewportHeight = window.innerHeight;
    const headerHeight = document.querySelector('header').offsetHeight;
    const initialHeight = viewportHeight - headerHeight;
    heroContainer.style.height = `${initialHeight}px`;
    // Definimos la altura mínima del héroe
    const heroMinHeight = 150;
    
    // Función para ajustar la altura del héroe al hacer scroll
    const adjustHeroHeight = () => {
        const scrollPosition = window.scrollY;
        const newHeight = Math.max(initialHeight - scrollPosition, heroMinHeight);
        heroContainer.style.height = `${newHeight}px`; // Actualizar la altura del heroContainer al hacer scroll
    };

    // Agregar efecto de ajuste de tamaño al hacer scroll
    window.addEventListener('scroll', adjustHeroHeight);

    //  -----------------------------------     TITLE     -------------------------------- //
    // Le damos un tamaño inicial al texto
    const initialTitleSize = 500;
    title.style.fontSize = `${initialTitleSize}px`; // Aplicar tamaño al título

    // Función para ajustar el tamaño del título y el contenido debajo
    const adjustTitleSize = () => {
        const scrollPosition = window.scrollY;
        const maxTitleSize = 500; // Tamaño máximo del título en px
        const minTitleSize = 100; // Tamaño mínimo del título en px
        const titleSize = Math.max(maxTitleSize - (scrollPosition * 0.8), minTitleSize); // Calcular tamaño del título
        title.style.fontSize = `${titleSize}px`; // Aplicar tamaño al título
    };

    // Agregar efecto de ajuste de tamaño al hacer scroll
    window.addEventListener('scroll', adjustTitleSize);



    return heroContainer;
}
