import {Listify} from './App/classes/Listify'
import {createListifyUI} from './App/UI'







import {displayNewTaskForm} from './App/eventListeners'
displayNewTaskForm()






// Create the website UI
createListifyUI()
//Create instance of listify, which holds all project and task data
const listify = new Listify()



export {listify}
