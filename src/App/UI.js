// Images
import ListifyBrandIcon from './assets/checkbox-icon.svg'
import CustomerIcon from './assets/customer-icon.svg'
import TrayFullIcon from './assets/tray-full-icon.svg'
import TodayIcon from './assets/today-icon.svg'
import MonthIcon from './assets/month-icon.svg'
import StarIcon from './assets/star-icon.svg'
import PlusIcon from './assets/plus-icon.svg'
// Methods 
import { renderIcon, toggleDarkMode } from './utils/helperFunctions'
// Event listen functions
import { updateViewTab, createNewProject } from './eventListeners'


function createHeader(){
    // Header container, will be appended to header wrapper, has two subsections
    const headerContainer = document.createElement('div')
    // CSS for headerContainer
    headerContainer.classList.add('headerContainer')
    // Left sub section
    const leftSubSection = document.createElement('div')
    leftSubSection.classList.add('leftSubSection')
    const listifyIcon = renderIcon(ListifyBrandIcon, 'Listify brand icon image', 'listifyIcon')
    const listifyTitle = document.createElement('h1')
    listifyTitle.innerHTML = "Listify"
    leftSubSection.append(listifyIcon)
    leftSubSection.append(listifyTitle)
    // Right sub section
    const rightSubSection = document.createElement('div')
    rightSubSection.classList.add('rightSubSection')
    const profileIcon = renderIcon(CustomerIcon, 'Image of a user profile icon', 'userProfileIcon')
    const currentUserName = document.createElement('h4')
    currentUserName.id = 'current-user-name' //Target later for displaying current user
    currentUserName.innerHTML = "John Doe"
    rightSubSection.append(profileIcon)
    rightSubSection.append(currentUserName)
    // Dark Mode Button
    const darkMode = document.createElement('button')
    darkMode.innerHTML = "Theme"
    darkMode.addEventListener('click', toggleDarkMode)
    darkMode.classList.add('darkModeToggle')
    // Appends
    headerContainer.append(darkMode)
    headerContainer.append(leftSubSection)
    headerContainer.append(rightSubSection)
    // Return header container
    return headerContainer
}


function createSidePanel(){
    // Array for easier appending of all the items to the wrapper
    let sideItemsArray = []
    // Create the main side bar section 
    const sidebarContainer = document.createElement('div')
    sidebarContainer.classList.add('sidebarContainer')
    // View section title
    const viewHeading = document.createElement('h3')
    viewHeading.innerHTML = "Home"
    viewHeading.style.borderBottom = "1px solid black"
    sideItemsArray.push(viewHeading)
    // View section inbox tab
    const inboxTab = createSidebarViewTab(TrayFullIcon, "Icon of a full inbox", "All Tasks", "sidebarTabViewIcon")
    sideItemsArray.push(inboxTab)
    // View section today tab
    const todayTab = createSidebarViewTab(TodayIcon,"Icon of a calendar today", "Today", "sidebarTabViewIcon")
    sideItemsArray.push(todayTab)
    // View section week tab
    const weekTab = createSidebarViewTab(MonthIcon,"Icon of a calendar month", "Next 7 Days", "sidebarTabViewIcon" )    
    sideItemsArray.push(weekTab)
    // View section of favorites tab
    const favoritesTab = createSidebarViewTab(StarIcon,"Icon of a start icon", "Favorites", "sidebarTabViewIcon" )    
    sideItemsArray.push(favoritesTab)
    // Project section title
    const projectHeading = document.createElement('h3')
    projectHeading.innerHTML = "Projects"
    projectHeading.style.borderBottom = "1px solid black"
    sideItemsArray.push(projectHeading)
    // Project section new project button
    const newProjectButton = createSidebarViewTab(PlusIcon,"Icon of a plus icon", "New Project", "sidebarTabViewIcon" )
    newProjectButton.id = 'new-project-button' 
    newProjectButton.addEventListener('click', createNewProject)  
    sideItemsArray.push(newProjectButton)
    // Create an anchor for appending future user projects tabs
    const projectAnchor = document.createElement('div')
    projectAnchor.id = 'new-project-container-anchor'
    sideItemsArray.push(projectAnchor)
    // Append all view components to container
    sideItemsArray.forEach(item =>{
        sidebarContainer.append(item)
    })    
    return sidebarContainer
}

function createSidebarViewTab(image, alt, tabName, styleClass){
    // Create the sidebarItem wrapper
    const tabItemContainer = document.createElement('div')
    tabItemContainer.classList.add('tabItemContainer')
    // Append the image
    tabItemContainer.append(renderIcon(image, alt, styleClass))
    // Append the tabName
    const title = document.createElement('h4')
    title.innerHTML = tabName
    tabItemContainer.append(title)
    if (tabName !== 'New Project'){
        tabItemContainer.addEventListener('click', updateViewTab)
    }
    return tabItemContainer
}

function createFooter(){
    // Footer container
    const footer = document.createElement('div')
    // Add inner HTML content
    const date = new Date().getFullYear()
    footer.innerHTML = "Copyright ©" + " " + date + " " 
    const link = document.createElement('a')
    link.href = "https://github.com/devingdaniels"
    link.target = "_blank"
    link.innerHTML = "devingdaniels"
    footer.append(link)
    // Return footer element with CSS and HTML content
    return footer
}

export {createHeader, createSidePanel, createFooter}