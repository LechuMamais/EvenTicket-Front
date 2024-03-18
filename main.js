import './style.css'
import { createHeader } from './components/global/header/header'
import { mainContainer } from './components/global/mainContainer/mainContainer';
import { createFooter } from './components/global/footer/footer';

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  app.appendChild(createHeader());
  app.appendChild(mainContainer());
  app.appendChild(createFooter());
});
