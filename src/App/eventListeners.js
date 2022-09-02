// Helper methods
import {removeProjectForm, disableNewProjectButton, enableNewProjectButton, showErrorMessage, disableNewTaskButton, enableNewTaskButton, formatJSDate, getCurrentActiveViewTab, getCurrentStar} from "./utils/helperFunctions"
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
    // Form 
    const form = document.createElement('form')
    form.id = 'new-task-form'
    // Title section with label and input
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
    // Description section of form with label and input 
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
    // Due date section of form with label and input 
    const dueDateWrapper = document.createElement('div')
    dueDateWrapper.classList.add('formSubSection')
    const dueDateLabel = document.createElement('label')
    dueDateLabel.innerHTML = 'Due Date'
    dueDateLabel.for = 'task-dueDate'
    const dueDateInput = document.createElement('input')
    dueDateInput.type = 'date'
    dueDateInput.id = 'task-dueDate'
    dueDateInput.min = new Date().toLocaleDateString('en-ca')    
    dueDateWrapper.append(dueDateLabel)
    dueDateWrapper.append(dueDateInput)
    // Button section of the form with 'create' and 'cancel' options
    const buttonWrapper = document.createElement('div')
    buttonWrapper.classList.add('newTaskButtonWrapper')
    const createTaskButton = document.createElement('input')
    createTaskButton.type = 'button'
    createTaskButton.value = 'Create'
    createTaskButton.addEventListener('click', ()=>{
        if (doesTaskFormHaveName()){
            if (isDuplicateTask()){ // CODE THIS, returns false for now
                
                showErrorMessage('task-title', 'Task already exists')
            }else{
                enableNewTaskButton()
                parseTaskForm()
            }           
        }
        else { 
            // Triggered if user does not enter a task title
            showErrorMessage('task-title', 'Add task title')
        }        
    })
    // Cancel the creation of a new task button
    const cancelButton = document.createElement('input')
    cancelButton.type = 'button'
    cancelButton.value = 'Cancel'
    cancelButton.addEventListener('click', removeTaskFormFromDom)
    buttonWrapper.append(createTaskButton)
    buttonWrapper.append(cancelButton)
    // Form appends
    form.append(titleWrapper)
    form.append(descriptionWrapper)
    form.append(dueDateWrapper)
    form.append(buttonWrapper)
    // Append form to 'current-view-wrapper' anchor of the dom
    anchor.append(form)
}



function parseTaskForm(){
    // Get the data from the form
    const title = document.getElementById('task-title').value
    const description = document.getElementById('task-description').value
    const tempDate = document.getElementById('task-dueDate').value
    const formattedDate = formatJSDate(tempDate)
    // Remove the form from the dom
    removeTaskFormFromDom()
     // Get the current open project
     const project = listify.getCurrentProject(document.getElementById('current-view-wrapper').firstChild.innerHTML)
    // Create new task object
    const task = new Task(title,description,formattedDate, project.projectTitle) 
    // Add the task object to the current projectArray
    project.taskArray.push(task)
    // Update the project view to show all tasks
    listify.displayCurrentProject(project.projectTitle)
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


function toggleTaskFavoriteStatus(taskTitle, projectTitle, star){
    const project = listify.getCurrentProject(projectTitle)
    
    const task = project.taskArray.find(task => task.taskTitle === taskTitle)

    console.log(star)
    if (task.isFavorite === true){
        task.isFavorite = false
        star.classList.add("fa-regular")
        star.classList.remove("fa-solid")
    }else {
        task.isFavorite = true
        star.classList.add("fa-solid")
        star.classList.remove("fa-regular")
    }

    updateViewTab(getCurrentActiveViewTab())
}


function isDuplicateTask(){

    alert('isDuplicateTask')
    return false
    // const title = document.getElementById('task-title').value

    // const currentProject = listify.getCurrentProject(title)
    // return currentProject.taskArray.some(task =>{
    //     if (task.taskTitle === title){
    //         return true
    //     }
    // })
}


function displayProjectOptionPanel(){
    alert('display project options panel')
}
function showEditTaskPanel(){
    alert('showEditTaskPanel')
}

function toggleTaskIsComplete(){
    alert('toggleTaskIsComplete')
}

export {updateViewTab, displayNewProjectForm, createNewProjectObject, displayProjectOptionPanel, displayNewTaskForm, toggleTaskFavoriteStatus,toggleTaskIsComplete,  showEditTaskPanel}