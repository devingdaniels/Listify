import { listify } from "../.."
import { disableNewTaskButton, enableNewProjectButton, disableNewProjectButton, doesTaskFormHaveName, isDuplicateTask, showErrorMessage, enableNewTaskButton } from "./helperFunctions"
import { formatJSDate } from "./helperFunctions"


function createTaskForm(currentTask){
   
    // Get and current project and task objects
    const projectObject = listify.getCurrentProject(currentTask.id)
    const taskObject = projectObject.getCurrentTask(currentTask.getAttribute('taskTitle'))

    // Disable the new task button
    disableNewTaskButton()
    // Disable the new project button
    disableNewProjectButton()
    
    // Form 
    const form = document.createElement('form')
    form.id = 'edit-task-form'
    // Title section with label and input
    const titleWrapper = document.createElement('div')
    titleWrapper.classList.add('formSubSection')
    const taskNameLabel = document.createElement('label')
    taskNameLabel.innerHTML = 'Title'
    taskNameLabel.for = 'task-title'
    const taskNameInput = document.createElement('input')
    taskNameInput.id = 'task-title'
    taskNameInput.type = 'text'
    taskNameInput.placeholder = taskObject.taskTitle
    taskNameInput.required = 'true'
    titleWrapper.append(taskNameLabel)
    titleWrapper.append(taskNameInput)
    //  Description section of form with label and input 
    const descriptionWrapper = document.createElement('div')
    descriptionWrapper.classList.add('formSubSection')
    const descriptionLabel = document.createElement('label')
    descriptionLabel.innerHTML = 'Description'
    descriptionLabel.for = 'task-description'
    const descriptionInput = document.createElement('textarea')
    descriptionInput.id = 'task-description'
    descriptionInput.style.resize = 'none'
    descriptionWrapper.append(descriptionLabel)
    descriptionWrapper.append(descriptionInput)
    //  Due date section of form with label and input 
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
    //  Button section of the form with 'create' and 'cancel' options
    const buttonWrapper = document.createElement('div')
    buttonWrapper.classList.add('newTaskButtonWrapper')
    const updateTaskButton = document.createElement('input')
    updateTaskButton.type = 'button'
    updateTaskButton.value = 'Update'
    updateTaskButton.addEventListener('click', ()=>{
        if (doesTaskFormHaveName()){
            if (isDuplicateTask()){ 
                showErrorMessage('task-title', 'Task already exists')
            }else{
                enableNewTaskButton()
                updateForm(taskObject)
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
    cancelButton.addEventListener('click', ()=>{
        // Enable buttons
        enableNewTaskButton()
        enableNewProjectButton()
        // Remove form from the dom
        const form = document.getElementById('edit-task-form')
        form.remove()
    })
    buttonWrapper.append(updateTaskButton)
    buttonWrapper.append(cancelButton)
    // // Form appends
    form.append(titleWrapper)
    form.append(descriptionWrapper)
    form.append(dueDateWrapper)
    form.append(buttonWrapper)
    
    return form
}


function  updateForm(taskObject){
    // Get data from updated task form
    const title = document.getElementById('task-title').value
    let description = document.getElementById('task-description').value
    if (description === ''){
        description = 'No Description'
    }
    const unParsedDate = document.getElementById('task-dueDate').value
    const formattedDate = formatJSDate(unParsedDate)

    // Remove the update task form from the dom
    document.getElementById('edit-task-form').remove()
    // Update task object with new info
    taskObject.taskTitle = title
    taskObject.taskDescription = description
    taskObject.dueDate = formattedDate

    listify.displayCurrentProject(taskObject.projectTitle)
}



export {createTaskForm}