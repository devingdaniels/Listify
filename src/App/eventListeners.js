// Helper methods
import {removeProjectForm, disableNewProjectButton, enableNewProjectButton } from "./utils/helperFunctions"
// Classes 
import { Project } from "./classes/project"
import {listify } from '../index.js'

// Images

function updateViewTab(currentTab){
    // Get all the current tabs on the sidebar
    const allTabItems = document.querySelectorAll('.tabItemContainer')
    // Make all tabs except current tab inactive
    allTabItems.forEach(tab =>{
        if (tab !== currentTab){
            tab.classList.remove('active')
        }
    })
    // Add active to current tab
    currentTab.classList.add('active')

    // Get the name of the current tab
    const tabName = currentTab.lastChild.innerHTML
    switch(tabName) {
        case 'All Tasks':
          listify.displayAllTasks()
          break;
        case 'Today':
            listify.displayToday()
          break;
        case 'Next 7 Days':
            listify.displayNextSevenDays()
          break;
        case 'Favorites':
            listify.displayFavorites()
          break;
        default:
          listify.displayCurrentProject(tabName)
      }
}



// This gets called when user clicks on 'add new project' button in the side panel
function displayNewProjectForm(){
    // Hide the new project button temporally 
    disableNewProjectButton()
    // Get a project template form
    const project = newProjectForm()
    const anchor = document.getElementById('project-form-container-anchor')
    // Append the new project form with input and buttons to the sidebar
    anchor.append(project)
}

// This gets called from displayNewProjectForm(), returns a div with input and two buttons
function newProjectForm(){
    const projectForm = document.createElement('div')
    projectForm.classList.add('projectFormContainer')
    // Input for getting the project title
    const projectInput = document.createElement('input')
    projectInput.placeholder = "Project title"
    projectInput.id = 'new-project-title'
    // Container for form save and cancel buttons
    const projectFormButtonContainer = document.createElement('div')
    projectFormButtonContainer.classList.add('projectFormButtonContainer')
    // Button for saving the new project
    const saveButton = document.createElement('button')
    saveButton.classList.add('newProjectSaveButton')
    saveButton.innerHTML = "Save"
    saveButton.addEventListener('click', ()=>{
        // Make sure there is not a project with same name
         // Get the title from the form 
        const projectTitle = document.getElementById('new-project-title').value
         if(!listify.isDuplicateTitle(projectTitle)){
            createNewProjectObject(projectTitle)  
         }else{
            const errorMessage = document.getElementById('new-project-title')
            errorMessage.classList.add('duplicateProjectTitleError')
            errorMessage.value = ""
            errorMessage.placeholder = "Project already exists..."
         }
    })
    // Button if user wants to cancel creating a new project
    const cancelButton = document.createElement('button')
    cancelButton.classList.add('newProjectCancelButton')
    cancelButton.innerHTML = "Cancel"
    cancelButton.addEventListener('click', () =>{
        removeProjectForm()
        enableNewProjectButton()
    })
    // Append the buttons to the button container
    projectFormButtonContainer.append(saveButton)
    projectFormButtonContainer.append(cancelButton)
    
    projectForm.append(projectInput)
    projectForm.append(projectFormButtonContainer)
    return projectForm
}

// Called when user presses 'save' when creating a new project
// Creates a new project object with title name, gets added to project array 
// Appends a new project tab item to the sidebar for user navigation
function createNewProjectObject(title){
    // Clear the project form from the sidebar
    removeProjectForm()
    // Enable the add new project button on the sidebar
    enableNewProjectButton()
    // Save title in new project object
    const project = new Project(title)    
    // Push the project on the Listify project array
    listify.projectArray.push(project)
    // Display each project on the side panel 
    listify.displayAllCurrentProjectsSidebar()
}



function displayNewTaskForm(){
    
}




function displayProjectOptionPanel(){
    alert('display project options panel')
}


export {updateViewTab, displayNewProjectForm, createNewProjectObject, displayProjectOptionPanel, displayNewTaskForm}