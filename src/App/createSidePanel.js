// Methods
import {renderIcon, createDomElement} from './utils/helperFunctions'
// Images
import TrayFullIcon from './assets/tray-full-icon.svg'
import TodayIcon from './assets/today-icon.svg'
import MonthIcon from './assets/month-icon.svg'


function createSideBar(){
    // Create the main side bar section 
    const sidePanel = document.createElement('div')
    sidePanel.classList.add('sidebar')
    let sideItemsArray = []
    //Item 1
    sideItemsArray.push(createSidebarItem(TrayFullIcon, "Icon of a full inbox", "Inbox", "sidebar-icon"))
    // Item 2
    sideItemsArray.push(createSidebarItem(TodayIcon, "Icon of a calendar today", "Today", "sidebar-icon"))
    // Item 3
    sideItemsArray.push(createSidebarItem(MonthIcon, "Icon of a calendar month", "Month", "sidebar-icon"))
    sideItemsArray.forEach(item =>{
        sidePanel.append(item)
    })    
    return sidePanel
}

function createSidebarItem(image, alt, label, styleClass){
    // Create the sidebarItem wrapper
    const sidebarItem = document.createElement('div')
    sidebarItem.classList.add('sidebar-item')
    // Append the image
    sidebarItem.append(renderIcon(image,alt, styleClass ))
    // Append the label
    const title = createDomElement('h2')
    title.innerHTML = label
    sidebarItem.append(title)
    return sidebarItem
}


export {createSideBar}