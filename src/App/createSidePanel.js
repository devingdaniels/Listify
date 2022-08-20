// Methods
import {renderIcon, createDomElement} from './utils/helperFunctions'
// Images
import TrayFullIcon from './assets/tray-full-icon.svg'
import TodayIcon from './assets/today-icon.svg'
import MonthIcon from './assets/month-icon.svg'
import NewProject from './assets/application-array-icon.svg'


function createSideBar(){
    const sidePanel = document.createElement('div')
    sidePanel.classList.add('sidebar')

    //Append new subsections 
    sidePanel.append(createViewSection()) // this is the view section of the side panel
    sidePanel.append(createProjectsSection()) // this is the projects section of the view panel
    return sidePanel
}


function createProjectsSection(){
    // Add H1 to separate projects from top three views
    const projects = createDomElement('h1','sidebarHeading')
    projects.innerHTML = "Projects"
    
    
    

    return projects

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
    const title = createDomElement('h3')
    title.innerHTML = label
    sidebarItem.append(title)
    return sidebarItem
}


export {createSideBar}