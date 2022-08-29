import { createDomElement, renderIcon } from "./utils/helperFunctions"
import AccountIcon from './assets/account-icon.svg'
import CheckBoxIcon from './assets/checkbox-icon.svg'

function createHeader(){
    // Containers 
    const anchor = document.getElementById('header-wrapper')    
    const headerContainer = createDomElement("header", "headerContainer")
    const titleContainer = createDomElement('div','titleContainer')
    const accountContainer = createDomElement('div','accountInfoContainer')


    // Main title and main webpage image
    const listifyIcon = renderIcon(CheckBoxIcon, "Image of checkbox icon", "listifyIcon")
    const title = createDomElement('h1', 'listifyTitle')
    title.textContent = "Listify"
    titleContainer.append(listifyIcon)
    titleContainer.append(title)


    // Account info, ie account icon and user name
    accountContainer.append(renderIcon(AccountIcon, "Icon of profile picture", "profileIcon"))
    const userName = document.createElement('h4')
    userName.innerHTML = "User Name"
    accountContainer.append(userName)

    // Append two sub sections to header container
    headerContainer.append(titleContainer)
    headerContainer.append(accountContainer)
    // Append the header container to the header anchor 
    anchor.append(headerContainer)
}

export {createHeader}

