import PlusIcon from '../assets/plus-icon.svg'
import { displayNewProjectForm,displayNewTaskForm, updateViewTab } from '../eventListeners'



function toggleDarkMode(){
    
alert('code darkmode')
    
}

function renderIcon(image, alt, styleClass){
    if (image === '' || image === null) return 
    const img = new Image()
    img.src = image
    img.alt = alt
    if (styleClass !== '' && styleClass !== null){
        img.classList.add(`${styleClass}`)
    }
    return img
}

function createNewProjectButton(){
    const anchor = document.getElementById('project-button-anchor')
    const button = createSidebarViewTab(PlusIcon,"Icon of a plus icon", "New Project", "sidebarTabViewIcon" )
    button.id = 'new-project-button'
    button.classList.add('newProjectButton')
    button.addEventListener('click', displayNewProjectForm)
    anchor.append(button)
}
function createNewTaskButton(){
    const anchor = document.getElementById('current-view-wrapper')
    const button = createSidebarViewTab(PlusIcon,"Icon of a plus icon", "Add Task", "sidebarTabViewIcon" )
    button.id = 'new-task-button'
    button.classList.add('newTaskButton')
    button.addEventListener('click', displayNewTaskForm)
    anchor.append(button)
}

function disableNewProjectButton(){
    const button = document.getElementById('new-project-button')
    button.style.pointerEvents = 'none'
}
function enableNewProjectButton(){
    const button = document.getElementById('new-project-button')
    button.style.pointerEvents = 'auto'
}

function disableNewTaskButton(){
    const button = document.getElementById('new-task-button')
    button.style.pointerEvents = 'none'
}
function enableNewTaskButton(){
    const button = document.getElementById('new-task-button')
    button.style.pointerEvents = 'auto'
}

function removeProjectForm(){
    const clearForm = document.getElementById('project-form-container-anchor')
    clearForm.innerHTML = ""
}


function createSidebarViewTab(image, alt, tabName, styleClass){
    // Create the sidebarItem wrapper
    const tabItemContainer = document.createElement('div')    
    // Append the image
    tabItemContainer.append(renderIcon(image, alt, styleClass))
    // Append the tabName
    const title = document.createElement('h4')
    title.innerHTML = tabName
    tabItemContainer.append(title)
    if (image !== PlusIcon ){
        tabItemContainer.addEventListener('click', () =>{
            if (!tabItemContainer.classList.contains('active')){
                updateViewTab(tabItemContainer)
            }            
        })
        tabItemContainer.classList.add('tabItemContainer')
    }
    return tabItemContainer
}

function showErrorMessage(targetElement, message){
    const errorMessage = document.getElementById(targetElement)
    errorMessage.classList.add('errorMessage')
    errorMessage.value = ""
    errorMessage.placeholder = message
}

export {renderIcon, toggleDarkMode, createNewProjectButton, createSidebarViewTab, disableNewProjectButton, enableNewProjectButton, removeProjectForm, createNewTaskButton, showErrorMessage, enableNewTaskButton, disableNewTaskButton}