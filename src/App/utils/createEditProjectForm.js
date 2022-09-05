import { disableNewProjectButton, enableNewProjectButton } from "./helperFunctions"

import { listify } from '../..'
import { showErrorMessage } from "./helperFunctions"


function createEditProjectForm(e){
    // Disable the new task button until current task is updated or cancelled 
    disableNewProjectButton()
    const projectTabTitleElement = e.target.parentElement.parentElement.firstChild.lastChild
    // Add this class in case user cancels edit
    projectTabTitleElement.classList.add('hideProjectTitle')
    // Show an input with 'update' and 'cancel' buttons
    // On cancel, put h4 with original title back
    // On update, put new title, update the project name by updating the view
    // For each task in the project, update the task.projectTitle attribute  

    const projectForm = document.createElement('div')
    projectForm.id = 'editProjectContainer'
    // Input for getting the project title
    const projectInput = document.createElement('input')
    projectInput.placeholder = projectTabTitleElement.innerHTML
    projectInput.id = 'updated-project-title'
    // Container for form save and cancel buttons
    const projectFormButtonContainer = document.createElement('div')
    projectFormButtonContainer.classList.add('projectFormButtonContainer')
    // Button for saving the new project
    const updateButton = document.createElement('button')
    updateButton.classList.add('newProjectSaveButton')
    updateButton.innerHTML = "Update"
    updateButton.addEventListener('click', ()=>{
        const projectTitle = document.getElementById('updated-project-title').value
         if(!listify.isDuplicateTitle(projectTitle)){
            // Remove the edit project form
            document.getElementById('editProjectContainer').remove()
            // Reshow project title h4 with updated title
            projectTabTitleElement.classList.remove('hideProjectTitle')
            // save the old project title
            const oldProjectTitle = projectTabTitleElement.innerHTML
            // Update the project title element with new title
            projectTabTitleElement.innerHTML = projectTitle
            // Update the project object and it tasks
            let project = listify.getCurrentProject(oldProjectTitle)
            // Update the project object title
            project.projectTitle = projectTitle
            // Update each task.projectTitle attribute 
            project.taskArray.forEach(task =>{
                task.projectTitle = projectTitle
            })
            // Update the DOM
            listify.displayCurrentProject(projectTitle)
         }else{
           showErrorMessage('updated-project-title', 'Project name taken')
         }
    })
    // Button if user wants to cancel creating a new project
    const cancelButton = document.createElement('button')
    cancelButton.classList.add('newProjectCancelButton')
    cancelButton.innerHTML = "Cancel"
    cancelButton.addEventListener('click', () =>{
        document.getElementById('editProjectContainer').remove()
        projectTabTitleElement.classList.remove('hideProjectTitle')
        enableNewProjectButton()
    })
    // Append the buttons to the button container
    projectFormButtonContainer.append(updateButton)
    projectFormButtonContainer.append(cancelButton)
    
    projectForm.append(projectInput)
    projectForm.append(projectFormButtonContainer)
    return projectForm

}

export {createEditProjectForm}