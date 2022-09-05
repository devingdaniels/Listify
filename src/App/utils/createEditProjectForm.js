import { disableNewProjectButton, enableNewProjectButton } from "./helperFunctions"


function createEditProjectForm(e){
    // Disable the new task button until current task is updated or cancelled 
    disableNewProjectButton()
    const projectTabTitleElement = e.target.parentElement.parentElement.firstChild.lastChild
    // Remove the element from DOM
    projectTabTitleElement.classList.add('hideProjectTitle')
    // Show an input with 'update' and 'cancel' buttons
    // On cancel, put h4 with original title back
    // On update, put new title, update the project name by updating the view
    // For each task in the project, update the task.projectTitle attribute  
    console.log(projectTabTitleElement)



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
        
        alert('update pressed')


        // const projectTitle = document.getElementById('new-project-title').value
        //  if(!listify.isDuplicateTitle(projectTitle)){
        //     createNewProjectObject(projectTitle)  
        //  }else{
        //    showErrorMessage('new-project-title', 'Project name taken')
        //  }
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