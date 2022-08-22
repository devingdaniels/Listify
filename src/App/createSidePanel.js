// Methods
import {renderIcon, createDomElement} from './utils/helperFunctions'
// Images
import TrayFullIcon from './assets/tray-full-icon.svg'
import TodayIcon from './assets/today-icon.svg'
import MonthIcon from './assets/month-icon.svg'
import PlusIcon from './assets/plus-icon.svg'
import { createNewProject } from './classes/appBrain'


function createSideBar(){
    const sidePanel = document.createElement('div')
    sidePanel.classList.add('sidebar')

    //Append new subsections 
    sidePanel.append(createViewSection()) // this is the view section of the side panel
    sidePanel.append(createProjectsSection()) // this is the projects section of the view panel
    return sidePanel
}


function createProjectsSection(){
    let sideItemsArray = []
    // Add H1 to separate projects from top three views
    const projectSection = document.createElement('div')
    projectSection.id = ('project-section')
    const projectHeading = createDomElement('h1','sidebarHeading')

    projectHeading.innerHTML = "Projects"
    sideItemsArray.push(projectHeading)

    const addButton = createSidebarItem(PlusIcon, "Icon of new project", "Add", "sidebar-icon")
    // custom styling on the item
    addButton.id = "project-add-button"


    addButton.addEventListener('click', ()=>{        
        addNewProject()
    })


    sideItemsArray.push(addButton)

    sideItemsArray.forEach(item =>{
        projectSection.append(item)
    })    
    return projectSection
}



function addNewProject(){
    // get the container to add the new project heading to
    const projectContainer = document.getElementById('project-section')
    // hide the add button
    const addButton  = document.getElementById('project-add-button')
    addButton.style.pointerEvents = "none"

    const project = createNewProject()

    
    projectContainer.append(project)
}



function createViewSection(){
    let sideItemsArray = []
    // Create the main side bar section 
    const viewSection = document.createElement('div')
    // Create views heading
    const view = createDomElement('h1','sidebarHeading')
    view.innerHTML = "Views"
    sideItemsArray.push(view)
    //Item 1
    sideItemsArray.push(createSidebarItem(TrayFullIcon, "Icon of a full inbox", "Inbox", "sidebar-icon"))
    // Item 2
    sideItemsArray.push(createSidebarItem(TodayIcon, "Icon of a calendar today", "Today", "sidebar-icon"))
    // Item 3
    sideItemsArray.push(createSidebarItem(MonthIcon, "Icon of a calendar month", "Month", "sidebar-icon"))
    sideItemsArray.forEach(item =>{
        viewSection.append(item)
    })    
    return viewSection
}


function createSidebarItem(image, alt, label, styleClass){
    // Create the sidebarItem wrapper
    const sidebarItem = document.createElement('div')
    sidebarItem.classList.add('sidebar-item')
    // Append the image
    sidebarItem.append(renderIcon(image, alt, styleClass))
    // Append the label
    const title = document.createElement('h3')
    title.innerHTML = label
    sidebarItem.append(title)
    return sidebarItem
}






export {createSideBar}