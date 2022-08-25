import { createDomElement, renderIcon } from "./utils/helperFunctions"
import AccountIcon from './assets/account-icon.svg'

function createHeader(){
    // Get and save the header wrapper
    const headerWrapper = document.getElementById('header-wrapper')
    //Create header content
    const header = createDomElement("header", "header")
    const title = createDomElement('h1', 'header-title')
    title.textContent = "Listify"
    
    header.append(title)
    const accountContainer = createDomElement('div','account-info-container')
    accountContainer.append(renderIcon(AccountIcon, "Icon of profile picture", "account-icon"))
    const userName = document.createElement('h4')
    userName.innerHTML = "User Name"
    accountContainer.append(userName)
    header.append(accountContainer)
    // Append new content to the wrapper
    headerWrapper.append(header)
}

export {createHeader}

