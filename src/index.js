import {Listify} from './App/classes/Listify'
import {createListifyUI} from './App/UI'


import {Task} from './App/classes/task'


const task = new Task('A task', 'Wow, such difficulty', '09/21/2022')

const container = task.displayPrettyTask('A task', 'Wow, suchWow, such difficultyqWow, such difficultyqWow, such difficultyqWow, such difficultyqWow, such difficultyq difficultyq', '09/21/2022')

document.getElementById('current-view-wrapper').append(container)


// Create the website UI
createListifyUI()
//Create instance of listify, which holds all project and task data
const listify = new Listify()

export {listify}
