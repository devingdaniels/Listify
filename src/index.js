import Listify from './App/classes/Listify';
import { createListifyUI } from './App/UI';
import { toggleDarkMode } from './App/eventListeners';
// Create the website UI
createListifyUI();
// Create instance of listify, which holds all project and task data
const listify = new Listify();
listify.displayAllTasks();
// init site to be dark mode
toggleDarkMode();

export { listify };
