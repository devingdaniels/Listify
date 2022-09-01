// Helper methods
import {removeProjectForm, disableNewProjectButton, enableNewProjectButton, showErrorMessage, disableNewTaskButton, enableNewTaskButton } from "./utils/helperFunctions"
// Classes 
import { Project } from "./classes/project"
import { Task } from "./classes/task"
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
           showErrorMessage('new-project-title', 'Project name taken')
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
    // Disable the new task button until current task is created or cancelled 
    disableNewTaskButton()
    // Get the anchor for appending this new task form
    const anchor = document.getElementById('current-view-wrapper')


    const form = document.createElement('form')
    form.id = 'new-task-form'


    const titleWrapper = document.createElement('div')
    titleWrapper.classList.add('formSubSection')
    const taskNameLabel = document.createElement('label')
    taskNameLabel.innerHTML = 'Title'
    taskNameLabel.for = 'task-title'
    const taskNameInput = document.createElement('input')
    taskNameInput.id = 'task-title'
    taskNameInput.type = 'text'
    taskNameInput.placeholder = 'My awesome new task'
    taskNameInput.required = 'true'
    
    titleWrapper.append(taskNameLabel)
    titleWrapper.append(taskNameInput)
    


    const descriptionWrapper = document.createElement('div')
    descriptionWrapper.classList.add('formSubSection')
    const descriptionLabel = document.createElement('label')
    descriptionLabel.innerHTML = 'Description'
    descriptionLabel.for = 'task-description'
    const descriptionInput = document.createElement('textarea')
    descriptionInput.id = 'task-description'
    descriptionInput.style.resize = 'none'
    descriptionInput.placeholder = 'i.e, the procrastination monkey is on my back'
    descriptionInput.required = 'true'
    
    descriptionWrapper.append(descriptionLabel)
    descriptionWrapper.append(descriptionInput)



    const dueDateWrapper = document.createElement('div')
    dueDateWrapper.classList.add('formSubSection')
    const dueDateLabel = document.createElement('label')
    dueDateLabel.innerHTML = 'Due Date'
    dueDateLabel.for = 'task-dueDate'
    const dueDateInput = document.createElement('input')
    dueDateInput.type = 'date'
    dueDateInput.id = 'task-dueDate'
    
    dueDateWrapper.append(dueDateLabel)
    dueDateWrapper.append(dueDateInput)




    const buttonWrapper = document.createElement('div')
    buttonWrapper.classList.add('newTaskButtonWrapper')

    const saveButton = document.createElement('input')
    saveButton.type = 'button'
    saveButton.value = 'Create'
    saveButton.addEventListener('click', ()=>{
        if (doesTaskFormHaveName()){
            enableNewTaskButton()
            parseTaskForm()
        }
        else { 
            showErrorMessage('task-title', 'Add task title')
        }        
    })

    const cancelButton = document.createElement('input')
    cancelButton.type = 'button'
    cancelButton.value = 'Cancel'
    cancelButton.addEventListener('click', removeTaskFormFromDom)


    buttonWrapper.append(saveButton)
    buttonWrapper.append(cancelButton)


    form.append(titleWrapper)
    form.append(descriptionWrapper)
    form.append(dueDateWrapper)
    form.append(buttonWrapper)

    anchor.append(form)
}



function parseTaskForm(){
    // Get the data from the form
    const title = document.getElementById('task-title').value
    const description = document.getElementById('task-description').value
    const dueDate = document.getElementById('task-dueDate').value
    // Remove the form from the dom
    removeTaskFormFromDom()
    // Create new task object
    const task = new Task(title,description,dueDate)
    console.log(task)
    // Add the task object to the current projectArray
    // Use data form task to create task dom element
    // Display all tasks for current project
}


function removeTaskFormFromDom(){
    enableNewTaskButton()
    document.getElementById('new-task-form').remove()
}


function doesTaskFormHaveName(){
    const title = document.getElementById('task-title').value
    if (title !== ''){
        return true
    }
    return false
}


function displayProjectOptionPanel(){
    alert('display project options panel')
}


export {updateViewTab, displayNewProjectForm, createNewProjectObject, displayProjectOptionPanel, displayNewTaskForm}