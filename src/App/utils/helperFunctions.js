import PlusIcon from '../assets/plus-icon.svg'
import { displayNewProjectForm, updateViewTab } from '../eventListeners'

function toggleDarkMode(){
    alert('code dark mode theme')
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

function disableNewProjectButton(){
    const button = document.getElementById('new-project-button')
    button.style.pointerEvents = 'none'
}

function removeProjectForm(){
    const clearForm = document.getElementById('project-form-container-anchor')
    clearForm.innerHTML = ""
}


function enableNewProjectButton(){
    const button = document.getElementById('new-project-button')
    button.style.pointerEvents = 'auto'
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

export {renderIcon, toggleDarkMode, createNewProjectButton, createSidebarViewTab, disableNewProjectButton, enableNewProjectButton, removeProjectForm}