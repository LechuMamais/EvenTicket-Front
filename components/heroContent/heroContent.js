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


    // Definimos scrollPosition
    var scrollPosition = window.scrollY;

    // Función para ajustar el tamaño del título y el contenido debajo
    const adjustTitleSize = () => {
        scrollPosition = window.scrollY;
        console.log(scrollPosition);
        const heroHeight = hero.offsetHeight;
        const maxTitleSize = 500; // Tamaño máximo del título en px
        const minTitleSize = 100; // Tamaño mínimo del título en px
        const titleSize = Math.max(maxTitleSize - (scrollPosition * 0.8), minTitleSize); // Calcular tamaño del título
        // Que además de achicarse, el título baje para que se siga viendoo como si estuviese fijo

        // Aplicar tamaño al título
        title.style.fontSize = `${titleSize}px`;
        //let titleTop = scrollPosition*1.2
        let titleTop;
        title.style.position = 'fixed'; 
        const topCorrectionFactor = 1
        if(scrollPosition<=376){
            titleTop = scrollPosition*topCorrectionFactor;
            title.style.top = `${titleTop}px`;

        }else{
            titleTop = scrollPosition

            title.style.top = `${titleTop}px`;
            
            //heroContainer.style.top = `${heroHeight}px`;
        }
        
        // Vamos a hacer que el hero, al llegar a cierto nivel de scroll, pase a estar fijo en la parte de arriba con INSOMNIA a la vista
        if(scrollPosition >= 600){
            heroContainer.style.position = 'fixed';
            heroContainer.style.top = `-540px`;
            title.style.top = `${600}px`;
            // Para que el events container se muestre correctamente, debemos fijarle una altura fija en relacion al scroll position
            const eventsContainer = document.querySelector('.events-container');
            console.log(eventsContainer);
            let marginTopValue = hero.offsetHeight -600+ scrollPosition ;
            eventsContainer.style.marginTop = `${marginTopValue}px`;

            // Y que el contenedor de las tarjetas de eventos sí se mueva.
            const eventCardContainer = document.querySelector('.events-card-container');
            eventCardContainer.style.marginTop = `${-scrollPosition+600}px`;
        }else if(scrollPosition<=600){
            //heroContainer.style.position = 'static';
            heroContainer.style.top = `${-scrollPosition+60}px`;
            const eventCardContainer = document.querySelector('.events-card-container');
            if(eventCardContainer){
                eventCardContainer.style.marginTop = `60px`;
                console.log(eventCardContainer.style.marginTop);
            }
        }
    };
    // Agregar efecto de ajuste de tamaño al hacer scroll
    window.addEventListener('scroll', adjustTitleSize);
    // Llamar a la función para ajustar el tamaño del título al cargar la página
    adjustTitleSize();

    return heroContainer;
}
