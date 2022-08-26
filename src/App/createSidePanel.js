// Methods
import {createDomElement, renderIcon, updateActive, disableAddProjectButton, addProjectOrTaskButton} from './utils/helperFunctions'
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
    sideItemsArray.push(viewHeading)
    // View section inbox tab
    const inboxTab = createViewTabItem(TrayFullIcon, "Icon of a full inbox", "Inbox", "sidebar-tab-icon")
    inboxTab.classList.add('active')
    sideItemsArray.push(inboxTab)
    // View section today tab
    const todayTab = createViewTabItem(TodayIcon,"Icon of a calendar today", "Today", "sidebar-tab-icon")
    sideItemsArray.push(todayTab)
    // View section month tab
    const monthTab = createViewTabItem(MonthIcon,"Icon of a calendar month", "Month", "sidebar-tab-icon" )    
    sideItemsArray.push(monthTab)
    // Append all view components to container
    sideItemsArray.forEach(item =>{
        viewSection.append(item)
    })    
    return viewSection
}


function createViewTabItem(image, alt, label, styleClass){
    // Create the sidebarItem wrapper
    const tabItem = document.createElement('div')
    tabItem.classList.add('sidebar-tab')
    // Append the image
    tabItem.append(renderIcon(image, alt, styleClass))
    // Append the label
    const title = document.createElement('h3')
    title.innerHTML = label
    tabItem.append(title)
    tabItem.addEventListener('click', () =>{
       updateActive(tabItem, 'sidebar-tab')
        handle(label)
         
    })       
    return tabItem
}


function handle(label){
 // Reset the current project section
 appBrain.resetProjectSection()

 if (label === "Inbox"){     
    appBrain.displayInbox()     
 }
 else if (label === "Today"){     
    appBrain.displayToday()
 }

 else if (label === "Month"){     
    appBrain.displayMonth()     
 }
}


function createProjectsSection(){
    // Create the projects section container
     const projectSection = document.createElement('div')
    projectSection.id = ('project-section')
    // Add projects section title
    const projectHeading = createDomElement('h1','sidebarHeading')
    projectHeading.innerHTML = "Projects"

    

    // Add project section 'add' project button
    const iconSpanContainer = addProjectOrTaskButton("Add Project")
    iconSpanContainer.id = ('iconSpanContainer')

    iconSpanContainer.addEventListener('click', ()=>{
        // Hide add icon so user can only add one project at a time
        disableAddProjectButton()
        // show add new project input 
        appBrain.displayNewProjectForm()
        
    })

    // Add anchor for adding new projects
    const newProjectsContainer = document.createElement('div')
    newProjectsContainer.id = "userProjectSection"

    // Append all the components 
    projectSection.append(projectHeading)
    projectSection.append(iconSpanContainer)
    projectSection.append(newProjectsContainer)
    return projectSection
}


function createSidePanel(){
    const sideBar = document.getElementById('sidebar-wrapper')
    //Append new subsections 
    sideBar.append(createViewSection()) // this is the view section of the side panel
    sideBar.append(createProjectsSection()) // this is the projects section of the view panel

    // 
    appBrain.displayInbox()
}


export {createSidePanel}