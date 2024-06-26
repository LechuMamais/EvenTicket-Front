import './style.css'
import { createHeader } from './components/global/header/header'
import { mainContainer } from './components/global/mainContainer/mainContainer';
import { createFooter } from './components/global/footer/footer';
import { resizeDomActualization } from './utils/resizeDomActualization';

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  app.appendChild(createHeader());
  app.appendChild(mainContainer());
  app.appendChild(createFooter());
});
window.addEventListener('resize', function () {
  // Si el usuario modifica manualmente el tamaño del dom, necesitamos recargar algunos elementos que tienen estilos en linea
  resizeDomActualization();
});