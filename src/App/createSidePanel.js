// Methods
import {createDomElement, renderIcon} from './utils/helperFunctions'
// Images
import TrayFullIcon from './assets/tray-full-icon.svg'
import TodayIcon from './assets/today-icon.svg'
import MonthIcon from './assets/month-icon.svg'

import PlusIcon from './assets/plus-icon.svg'

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
    tabItem.addEventListener('click', ()=>{
        alert(`${label} tab was pressed`)

        // NEED CODE HERE
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
    // Add project section 'add' project button
    const plusIcon = renderIcon(PlusIcon, "Icon plus sign", "newProjectIcon")
    plusIcon.addEventListener('click', ()=>{
        alert('create a new project ')

        // NEED CODE HERE
        // Disable add button until save or cancel of new project
        // Display the input element with buttons


        // Create a new project 
        // Get a title for the project
        // On 'save', append the title of the project to the newProjectsContainer, make the title a tab so it is tied to the project and the tasks are displayed in the project-wrapper section 
        // On cancel, hide the input and buttons


    

    })
    // Add anchor for adding new projects
    const newProjectsContainer = document.createElement('div')
    newProjectsContainer.id = "newProjectsContainer"

    // Append all the components 
    projectSection.append(projectHeading)
    projectSection.append(plusIcon)
    projectSection.append(newProjectsContainer)
    return projectSection
}


function createSideBar(){
    const sideBar = document.getElementById('sidebar-wrapper')
    //Append new subsections 
    sideBar.append(createViewSection()) // this is the view section of the side panel
    sideBar.append(createProjectsSection()) // this is the projects section of the view panel
}

export {createSideBar}