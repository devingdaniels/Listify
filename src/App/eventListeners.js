import { hideNewProjectButton } from "./utils/helperFunctions"

function updateViewTab(){
    alert('update the current view')
}

function createNewProject(){
    hideNewProjectButton()
    const project = document.createElement('p')
    project.innerHTML = "project"
    alert('create a new project')
}

export {updateViewTab, createNewProject}