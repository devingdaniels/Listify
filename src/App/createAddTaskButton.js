import PlusIcon from './assets/plus-icon.svg'
import { renderIcon } from './utils/helperFunctions'


function createAddTaskButton(){
    const button = document.createElement('button')
    button.classList.add('addTaskButton')

    const img = renderIcon(PlusIcon, "Add list item icon", "addTaskImage")
    button.append(img)

    button.addEventListener('click', ()=>{
        alert('code and build add a task functionality')
       
    })

    document.body.append(button)
    
}

export {createAddTaskButton}