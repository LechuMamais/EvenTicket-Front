import './heroContent.css';

const headerInitialMarginCalculator = () => {
    const headerContainer = document.querySelector('header');
    const headerTitle = document.querySelector('#header-home-link-container');
    const viewportHeight = window.innerHeight;
    const headerTitleMarginTop = (viewportHeight * 0.5) - (headerTitle.clientHeight * 0.5) - (headerContainer.clientHeight * 0.5)/**/;
    console.log('viewportHeight', viewportHeight);
    console.log('headerTitle.clientHeight', headerTitle.clientHeight);
    console.log('headerTitle', headerTitle)
    //headerTitle.style.marginTop = `${headerTitleMarginTop}px`;
    return headerTitleMarginTop
}

const headerMarginScrollModifier = (scrollTop) => {
    // Modificamos el marginTop del title
    const parallaxFactor = 0.5; // Modificador del scrollTop Position
    const headerTitleContainer = document.querySelector('#header-home-link-container');
    const headerTitlePrevMarginTop = headerInitialMarginCalculator();
    console.log('headerTitlePrevMarginTop', headerTitlePrevMarginTop);
    const translateY = scrollTop * parallaxFactor;
    const headerTitleContainerMarginTop = Math.max(headerTitlePrevMarginTop - translateY, 0);
    headerTitleContainer.style.marginTop = `${headerTitleContainerMarginTop}px`;
    console.log('headerTitleContainerMarginTop', headerTitleContainerMarginTop);
}

const maxTitleSizeCalculator = () => {
    const viewportWidth = window.innerWidth;
    const sizeCorrectorParam = 1/7;
    const maxTitleSize = viewportWidth*sizeCorrectorParam;
    return maxTitleSize;
}

const headerFontSizeScrollModifier = (scrollTop) => {
    // Modificamos el fontSize del title
    // Cuando scrollTop sea viewportHeigth-headerHeight, que fontSize sea 20px
    const headerTitle = document.querySelector('#header-home-link-container a');
    const maxTitleSize = maxTitleSizeCalculator();
    console.log('maxTitleSize',maxTitleSize)
    const minTitleSize = 20;
    const headerContainer = document.querySelector('header')
    const headerHeight = headerContainer.clientHeight

    const viewportHeight = window.innerHeight;
    const scrollTopBreakPoint = ((viewportHeight - headerHeight) - headerHeight);
    // En scrollTopBreakPoint queremos que fontSize = 20
    // En scrollTop = 0 queremos que fontSize = 200
    // Y en el medio, una transicion. O sea fontSize = (scrollTopBreakPoint-scrollTop)/scrollTopBreakPoint *(maxTitleSize-minTitleSize)*maxTitleSize

    const actualTitleSize = ((scrollTopBreakPoint - scrollTop) / scrollTopBreakPoint * maxTitleSize);
    headerTitle.style.fontSize = `${Math.max(actualTitleSize, minTitleSize)}px`;

}

const headerBackgroundSetter = (scrollTop, heroContainer) => {
    // Fijar el hero para que quede como fondo del header
    // Para eso haremos que cuando al hacer scroll se llegue a la posicion donde el hero se vea la misma altura del header, le
    // ponemos background al header. Despues, si se vuelve a hacer scroll hacia arriba, hay que volverselo a quitar

    const headerContainer = document.querySelector('header');
    const headerHeight = headerContainer.clientHeight;
    const heroHeight = heroContainer.clientHeight;

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

const scrollHandler = () => {
    // Las modificaciones al header las queremos sólo cuando está el hero
    const heroContainer = document.querySelector('.hero-container');
    if (!heroContainer) { return }
    const scrollTop = window.scrollY;
    // Funciones que modifican el Header:
    headerFontSizeScrollModifier(scrollTop);    // fontSize
    headerMarginScrollModifier(scrollTop);      // marginTop
    headerBackgroundSetter(scrollTop, heroContainer)           // background

}

export const headerTitleModifier = () => {
    const scrollTop = window.scrollY;
    console.log(scrollTop)

    headerFontSizeScrollModifier(scrollTop);
    headerMarginScrollModifier(scrollTop);

};

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
