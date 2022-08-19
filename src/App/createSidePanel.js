import { renderTodayIcon, renderTrayFullIcon } from './utils/renderIcons'
import { createH3 } from './utils/createDOMElements'


function createSideBar(){
    // Create the main side bar section 
    const sidePanel = document.createElement('div')
    sidePanel.classList.add('sidebar')

    let sideItemsArray = []

    //Item 1
    sideItemsArray.push(createSidebarItem(renderTrayFullIcon(), "Inbox")) 

    // Item 2
    sideItemsArray.push(createSidebarItem(renderTodayIcon(), "Today")) 


    sideItemsArray.forEach(item =>{
        sidePanel.append(item)
    })    
    return sidePanel
}

function createSidebarItem(image, label){
    // Create the sidebarItem wrapper
    const sidebarItem = document.createElement('div')
    sidebarItem.classList.add('sidebar-item')
    // Append the image
    sidebarItem.append(image)
    // Append the label
    const title = createH3()
    title.innerHTML = label
    sidebarItem.append(title)
    return sidebarItem
}


export {createSideBar}