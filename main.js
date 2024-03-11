import './style.css'
import { createHeader } from './components/header/header'
import { mainContainer } from './components/mainContainer/mainContainer';
import { createFooter } from './components/footer/footer';

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  app.appendChild(createHeader());
  app.appendChild(mainContainer());
  app.appendChild(createFooter());
});
