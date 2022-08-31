import '../style.css'
// Images
import ListifyBrandIcon from './assets/checkbox-icon.svg'
import CustomerIcon from './assets/customer-icon.svg'
import TrayFullIcon from './assets/tray-full-icon.svg'
import TodayIcon from './assets/today-icon.svg'
import MonthIcon from './assets/month-icon.svg'
import StarIcon from './assets/star-icon.svg'
// Methods 
import { renderIcon, toggleDarkMode, createSidebarViewTab, createNewProjectButton } from './utils/helperFunctions'


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
    const currentUserName = document.createElement('h6')
    currentUserName.id = 'current-user-name' //Target later for displaying current user
    currentUserName.innerHTML = "John Doe"
    rightSubSection.append(profileIcon)
    rightSubSection.append(currentUserName)



    // Dark Mode Button
    const darkModeWrapper = document.createElement('div')
    const darkModeInput = document.createElement('input')
    darkModeInput.type = 'checkbox'
    darkModeInput.id = 'darkmode-toggle'
    darkModeInput.addEventListener('click', toggleDarkMode)
    const darkModeLabel = document.createElement('label')
    darkModeLabel.for = 'darkmode-toggle'
    darkModeWrapper.append(darkModeInput)
    darkModeWrapper.append(darkModeLabel)

    // Appends
    headerContainer.append(darkModeWrapper)
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
    // Project section new project anchor
    const projectButtonAnchor = document.createElement('div')
    projectButtonAnchor.id = 'project-button-anchor'
    sideItemsArray.push(projectButtonAnchor)
     // Create an anchor for appending new project forms
     const projectFormAnchor = document.createElement('div')
     projectFormAnchor.id = 'project-form-container-anchor'
     sideItemsArray.push(projectFormAnchor)
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

function createListifyUI(){
    document.getElementById('header-wrapper').append(createHeader())
    document.getElementById('sidebar-wrapper').append(createSidePanel())
    document.getElementById('footer-wrapper').append(createFooter())
    createNewProjectButton()    
}

export {createHeader, createSidePanel, createFooter, createListifyUI}