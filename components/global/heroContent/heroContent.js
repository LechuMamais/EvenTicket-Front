import './heroContent.css';


const TitleSizeModifier = (headerTitle) => {
    //console.log('TitleSizeModifier');
    const maxTitleSize = 160
    headerTitle.style.fontSize = `${maxTitleSize}px`
    return maxTitleSize;
};


export const headerTitleModifier = () => {
    
    // Modificador, que ubica al titulo en el centro del viewport
    const headerTitleContainer = document.querySelector('#header-home-link-container a');
    const headerTitle = document.querySelector('#header-home-link-container');
    // Y además llama a la función que le da el tamaño inicial
    TitleSizeModifier(headerTitleContainer);
    //console.log('headerTitleModifier');
    //console.log('headerTitle', headerTitle);
    const viewportHeight = window.innerHeight;
    //console.log('viewportHeight', viewportHeight);
    //console.log('HeaderTitleInnerHeight', headerTitle.clientHeight)
    const headerTitleMarginTop = (viewportHeight * 0.5) - (headerTitle.clientHeight * 0.5);
    //console.log('headerTitleMarginTop', headerTitleMarginTop);
    headerTitle.style.marginTop = `${headerTitleMarginTop}px`;

};

const scrollHandler = () => {
    // Las modificaciones al scrollHandler las queremos sólo cuando está el hero
    const heroContainer = document.querySelector('.hero-container');
    if (!heroContainer) { return }

    // Modificamos la posicion del title
    const scrollTop = window.scrollY;
    //console.log('scrollTop', scrollTop);

    const parallaxFactor = 0.1; // Factor de parallax 

    const headerTitleContainer = document.querySelector('#header-home-link-container');
    const headerTitlePrevMarginTop = headerTitleContainer.clientHeight
    const translateY = scrollTop * parallaxFactor;
    const headerTitleContainerMarginTop = Math.max(headerTitlePrevMarginTop - translateY, 0)
    headerTitleContainer.style.marginTop = `${headerTitleContainerMarginTop}px`;


    // Modificamos el tamaño del title
    // Cuando scrollTop sea viewportHeigth-headerHeight, que fontSize sea 20px

    const headerTitle = document.querySelector('#header-home-link-container a');
    const maxTitleSize = 160;
    const minTitleSize = 20;
    const headerContainer = document.querySelector('header')
    const headerHeight = headerContainer.clientHeight

    const viewportHeight = window.innerHeight;
    const scrollTopBreakPoint = ((viewportHeight - headerHeight) - headerHeight );
    //console.log('scrollTopBreakPoint', scrollTopBreakPoint);
    // En scrollTopBreakPoint queremos que fontSize = 20
    // En scrollTop = 0 queremos que fontSize = 200
    // Y en el medio, una transicion. O sea fontSize = (scrollTopBreakPoint-scrollTop)/scrollTopBreakPoint *(maxTitleSize-minTitleSize)*maxTitleSize

    const actualTitleSize = ((scrollTopBreakPoint - scrollTop) / scrollTopBreakPoint * maxTitleSize);
    headerTitle.style.fontSize = `${Math.max(actualTitleSize, minTitleSize)}px`;


    // Fijar el hero para que quede como fondo del header
    // Para eso necesitamos haremos que cuando al hacer scroll se llegue a la posicion donde el hero se vea la misma altura del header, le
    // ponemos background al header. Despues, si se vuelve a hacer scroll hacia arriba, hay que volverselo a quitar

    //const heroContainer = document.querySelector('.hero-container');
    const heroHeight = heroContainer.clientHeight;

    //console.log('heroHeight = viewportHeight = ', heroHeight);
    //console.log('viewportHeight-scrollTopAjustado', viewportHeight - scrollTop)

    //console.log('scrollTop', scrollTop);

    // backgroundImage: px = 549x366

    //console.log('scrollTopAjustado', scrollTop);
    //console.log('(heroHeight)', (heroHeight));

    // La logica de los if está correcta
    if (scrollTop > (heroHeight - headerHeight)) {
        //En este caso, le agregamos el fondo al header
        //console.log('agregamos background al header')
        headerContainer.style.backgroundImage = `url('/background-hero.jpg')`; // Le damos fondo al header
        headerContainer.style.backgroundPositionY = 'bottom';
    }
    if (scrollTop <= (heroHeight - headerHeight)) {
        //En este caso, le quitamos el background al header
        //console.log('El header tiene el hero debajo')
        headerContainer.style.backgroundImage = ''; // Vacía el fondo del header
    }

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function heroContainer() {
    // Crear contenedor principal del héroe
    const heroContainer = document.createElement('div');
    heroContainer.classList.add('hero-container');

    // Crear héroe con imagen de fondo
    const hero = document.createElement('div');
    hero.classList.add('hero');
    heroContainer.appendChild(hero);

    // Calculamos la altura inicial del héroe
    const viewportHeight = window.innerHeight;
    const initialHeight = viewportHeight
    heroContainer.style.height = `${initialHeight}px`;
    // Y el marginTop, que es -la altaura del header
    const header = document.querySelector('header');
    //console.log(`-${(header.offsetHeight)}px`)
    heroContainer.style.marginTop = `-${(header.offsetHeight)}px`;

    headerTitleModifier()

    window.addEventListener('scroll', scrollHandler);

    return heroContainer;
}
