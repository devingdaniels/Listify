// Methods
import {createDomElement, renderIcon, updateActive, disableAddProjectButton, addProjectOrTaskButton, displayNewProjectForm} from './utils/helperFunctions'
// Images
import TrayFullIcon from './assets/tray-full-icon.svg'
import TodayIcon from './assets/today-icon.svg'
import MonthIcon from './assets/month-icon.svg'

import { appBrain } from '../index.js'


function createViewSection(){
    // Array for easier appending of all the items to the wrapper
    let sideItemsArray = []
    // Create the main side bar section 
    const viewSection = document.createElement('div')
    viewSection.id = "view-section"
    // View section title
    const viewHeading = createDomElement('h1','sidebarHeading')
    viewHeading.innerHTML = "Views"
    viewHeading.style.borderBottom = "1px solid black"
    sideItemsArray.push(viewHeading)
    // View section inbox tab
    const inboxTab = createViewTabItem(TrayFullIcon, "Icon of a full inbox", "Inbox", "sidebarTabIcon")
    inboxTab.classList.add('active')
    sideItemsArray.push(inboxTab)
    // View section today tab
    const todayTab = createViewTabItem(TodayIcon,"Icon of a calendar today", "Today", "sidebarTabIcon")
    sideItemsArray.push(todayTab)
    // View section month tab
    const monthTab = createViewTabItem(MonthIcon,"Icon of a calendar month", "Month", "sidebarTabIcon" )    
    sideItemsArray.push(monthTab)
    // Append all view components to container
    sideItemsArray.forEach(item =>{
        viewSection.append(item)
    })    
    return viewSection
}

function createViewTabItem(image, alt, tabName, styleClass){
    // Create the sidebarItem wrapper
    const tabItem = document.createElement('div')
    tabItem.classList.add('sidebarTabLabel')
    // Append the image
    tabItem.append(renderIcon(image, alt, styleClass))
    // Append the tabName
    const title = document.createElement('h3')
    title.innerHTML = tabName
    tabItem.append(title)
    tabItem.addEventListener('click', () =>{
        updateActive(tabItem, 'sidebarTabLabel')
        appBrain.displayActiveView(tabName)         
    })       
    return tabItem
}

function createProjectsSection(){
    // Create the projects section container
    const projectSection = document.createElement('div')
    projectSection.id = ('project-section')
    // Add projects section title
    const projectHeading = createDomElement('h1','sidebarHeading')
    projectHeading.innerHTML = "Projects"
    projectHeading.style.borderBottom = "1px solid black"


    // Add project section 'add' project button
    const iconSpanContainer = addProjectOrTaskButton("Add Project")
    

    iconSpanContainer.addEventListener('click', ()=>{
        // Hide add icon so user can only add one project at a time
        disableAddProjectButton()
        // show add new project input 
        displayNewProjectForm()
        
    })



    // Add anchor for adding new projects
    const newProjectTitleAnchor = document.createElement('div')
    newProjectTitleAnchor.id = "newProjectTitleAnchor"

    // Add anchor for adding new projects
    const newProjectsContainer = document.createElement('div')
    newProjectsContainer.id = "userProjectSection"

    // Append all the components 
    projectSection.append(projectHeading)
    projectSection.append(iconSpanContainer)
    projectSection.append(newProjectTitleAnchor)
    projectSection.append(newProjectsContainer)
    return projectSection
}


function createSidePanel(){
    const sideBar = document.getElementById('sidebar-wrapper')
    //Append new subsections 
    sideBar.append(createViewSection()) // this is the view section of the side panel
    sideBar.append(createProjectsSection()) // this is the projects section of the view panel    
}


export {createSidePanel}