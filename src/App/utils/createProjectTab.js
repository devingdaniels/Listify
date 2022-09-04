import { createSidebarViewTab } from './helperFunctions'
import {editCurrentProject, deleteCurrentProject} from '../eventListeners'
import FolderIcon from '../assets/folder-icon.svg'




function createNewProjectTabSection(projectTitle){
    const projectSidebarItemWrapper = document.createElement('div')
    projectSidebarItemWrapper.classList.add('projectSidebarItemWrapper')
    const projectSidebarItem = createSidebarViewTab(FolderIcon, 'Icon of a folder image', projectTitle, 'sidebarTabViewIcon')
    // Options button for editing project name or deleting project after creation

    const editDeleteWrapper = document.createElement('div')
    editDeleteWrapper.setAttribute('projectName', projectTitle)
    editDeleteWrapper.classList.add('editDeleteWrapper')
    const optionsButton = document.createElement('i')
    optionsButton.classList.add('fa-solid', 'fa-pen-to-square')
    optionsButton.style.cursor = "pointer"
    optionsButton.addEventListener('click', e =>{
        editCurrentProject(e)
    })
    const deleteButton = document.createElement('i')
    deleteButton.classList.add('fa-solid', 'fa-trash')
    deleteButton.style.cursor = "pointer"
    deleteButton.addEventListener('click', e=>{
        deleteCurrentProject(e)
    })

    editDeleteWrapper.append(optionsButton)
    editDeleteWrapper.append(deleteButton)
    
    // Append the project tab and project options icon to the wrapper
    projectSidebarItemWrapper.append(projectSidebarItem)
    projectSidebarItemWrapper.append(editDeleteWrapper)
    return projectSidebarItemWrapper
}


export {createNewProjectTabSection}