import { createSidebarViewTab, renderIcon } from './helperFunctions'
import {displayProjectOptionPanel} from '../eventListeners'
import FolderIcon from '../assets/folder-icon.svg'
import DotsVertical from '../assets/dots-vertical-icon.svg'



function createNewProjectTabSection(projectTitle){
    const projectSidebarItemWrapper = document.createElement('div')
    projectSidebarItemWrapper.classList.add('projectSidebarItemWrapper')
    const projectSidebarItem = createSidebarViewTab(FolderIcon, 'Icon of a folder image', projectTitle, 'sidebarTabViewIcon')
    // Options button for editing project name or deleting project after creation
    const optionsButton = renderIcon(DotsVertical, 'Image of three vertical dots','projectOptionButton' )
    optionsButton.classList.add('newProjectOptionsButton')
    optionsButton.addEventListener('click', displayProjectOptionPanel)
    projectSidebarItem.append(optionsButton)
    // Append the project tab and project options icon to the wrapper
    projectSidebarItemWrapper.append(projectSidebarItem)
    projectSidebarItemWrapper.append(optionsButton)
    return projectSidebarItemWrapper
}


export {createNewProjectTabSection}