import PlusIcon from './assets/plus-icon.svg'
import { renderIcon } from './utils/helperFunctions'


function createAddTaskButton(){
    const button = document.createElement('button')
    button.classList.add('addTaskButton')

    const img = renderIcon(PlusIcon, "Add list item icon", "addTaskImage")
    button.append(img)

    button.addEventListener('click', ()=>{
        document.getElementById('footer-wrapper').scrollIntoView()
        const test = document.getElementById('project-wrapper')
        const test2 = document.createElement('h1')
        test2.innerHTML = "test"
        test.append(test2)       
    })

    document.body.append(button)
    
}

export {createAddTaskButton}