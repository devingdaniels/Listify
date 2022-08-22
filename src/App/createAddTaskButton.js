import PlusIcon from './assets/plus-icon.svg'
import { renderIcon, updateActive } from './utils/helperFunctions'
import { taskAppBrain } from '../index.js'


function createAddTaskButton(){
    const button = document.createElement('button')
    button.classList.add('addTaskButton')

    const img = renderIcon(PlusIcon, "Add list item icon", "addTaskImage")
    button.append(img)
    button.addEventListener('click', ()=>{
        updateActive(document.querySelector('.sidebar-tab'))
        handle()  
    })
    document.body.append(button)
}

function handle(){
    // Scroll to bottom of list for adding new task
    document.getElementById('footer-wrapper').scrollIntoView()

    taskAppBrain().createTask()
    taskAppBrain().displayInbox()
    console.log(taskAppBrain().listArray.length)

}

export {createAddTaskButton}