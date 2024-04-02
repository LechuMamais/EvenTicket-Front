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
    // Definimos la altura mínima del héroe. dependerá del ancho de la página
    let heroMinHeight = 150;
    let windowWidth = window.innerWidth;
    if (windowWidth < 600) {
        heroMinHeight = 130
    }
    if (windowWidth < 500) {
        heroMinHeight = 100
    }
    if (windowWidth < 400) {
        heroMinHeight = 80
    } 
    if (windowWidth < 300) {
        heroMinHeight = 60
    } ;
    
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
        // Tamaño mínimo del título en px, dependerá del ancho de la ventana
        let minTitleSize = 100;
        let windowWidth = window.innerWidth;
        if (windowWidth < 600) {
            minTitleSize = 80
        }
        if (windowWidth < 500) {
            minTitleSize = 66
        }
        if (windowWidth < 400) {
            minTitleSize = 46
        } 
        if (windowWidth < 300) {
            minTitleSize = 30
        };
        const titleSize = Math.max(maxTitleSize - (scrollPosition * 0.8), minTitleSize); // Calcular tamaño del título
        title.style.fontSize = `${titleSize}px`; // Aplicar tamaño al título
    };

    // Agregar efecto de ajuste de tamaño al hacer scroll
    window.addEventListener('scroll', adjustTitleSize);
    
    return heroContainer;
}
