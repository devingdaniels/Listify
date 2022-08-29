import PlusIcon from '../assets/plus-icon.svg'
import { Task } from '../classes/task'
import { appBrain } from '../../index.js'
import { displayActiveProject } from '../classes/appBrain'



function getCurrentDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today
    
}

function createDomElement(type, classList){
    const el = document.createElement(type)
    if (classList !== "" && classList !== null){
        el.classList.add(classList)
    }    
    return el
}

function renderIcon(image, alt, styleClass){
    const img = new Image()
    img.src = image
    img.alt = alt
    img.classList.add(`${styleClass}`)
    return img
}


function updateActive(tabItem, className){
    if (tabItem.classList.contains('active')) return null
    // Update the current active tab
    const viewTabs = document.querySelectorAll('.' + className)
    viewTabs.forEach(item =>{
        if (item !== tabItem){
            item.classList.remove('active')
        }
    })    
    tabItem.classList.add('active')
}

function enableAddProjectButton(){
    const newItemButton = document.querySelectorAll('.iconSpanContainer')
    newItemButton.forEach(item =>{
        item.style.display = "flex"
    })    
}
function disableAddProjectButton(){
    const newItemButton = document.querySelectorAll('.iconSpanContainer')
    newItemButton.forEach(item =>{
        item.style.display = "none"
    })    
}

function addProjectOrTaskButton(label){    
    const iconSpanContainer = document.createElement('div')
    iconSpanContainer.classList.add('iconSpanContainer') 
    const plusIcon = renderIcon(PlusIcon, "Icon plus sign", "addNewItemIcon")
    const span = document.createElement('span')
    span.textContent = label
    span.style.cursor = 'pointer'
    iconSpanContainer.append(plusIcon)
    iconSpanContainer.append(span)
    return iconSpanContainer
}


function newTaskTemplateForm(){
    const formWrapper = document.createElement('div')
    formWrapper.id = ('taskFormWrapper')
    const form = document.createElement('form')
    form.id = "new-task-form"
    form.action = "#"
    form.method = "post"
    

    const titleWrapper = document.createElement('div')
    titleWrapper.classList.add('titleWrapper')

    const titleLabel = document.createElement('label')
    titleLabel.for = "title"
    titleLabel.innerHTML = "Title:"
    const titleInput = document.createElement('input')
    titleInput.type = "text"
    titleInput.id = "title"
    titleInput.placeholder = "What is this task?"
    titleInput.minLength = 1
    titleInput.maxLength = 50
    titleInput.required = true

    titleWrapper.append(titleLabel)
    titleWrapper.append(titleInput)


    const descriptionWrapper = document.createElement('div')
    descriptionWrapper.id = 'descriptionWrapper'

    const descriptionLabel = document.createElement('label')
    descriptionLabel.for = "description"
    descriptionLabel.innerHTML = "Description:"

    const descriptionInput = document.createElement('textarea')
    descriptionInput.id = "description"
    descriptionInput.placeholder = "ie, some info about your task"
    descriptionInput.name = 'descriptionInfo'
    descriptionInput.style.resize = "none"
    descriptionInput.required = "true"
    

    descriptionWrapper.append(descriptionLabel)
    descriptionWrapper.append(descriptionInput)

    
    const dueDateWrapper = document.createElement('div')
    dueDateWrapper.id = "dueDateWrapper"

    const dueDateLabel = document.createElement('label')
    dueDateLabel.for = 'dueDate'
    dueDateLabel.innerHTML = 'Due Date:'

    const dueDateInput = document.createElement('input')
    dueDateInput.type = 'date'
    dueDateInput.id = 'dueDate'

    dueDateWrapper.append(dueDateLabel)
    dueDateWrapper.append(dueDateInput)



    const buttonWrapper = document.createElement('div')
    buttonWrapper.id = "newTaskButtonWrapper"

    const saveButton = document.createElement('button')
    saveButton.id = 'new-task-save-button'
    saveButton.type = 'submit'
    saveButton.innerHTML = "Save"
    saveButton.addEventListener('click', e=>{
        e.preventDefault() 
        createNewTaskFromForm()        
    })


    buttonWrapper.append(saveButton)    
    form.append(titleWrapper)
    form.append(descriptionWrapper)
    form.append(dueDateWrapper)
    form.append(buttonWrapper)
    // form.append(descriptionInput)    
    // form.append(dueDate)
    formWrapper.append(form)
    return formWrapper
}


function createNewTaskFromForm(){
    const title = document.getElementById('title').value   
    const description = document.getElementById('description').value
    const dueDate = document.getElementById('dueDate').value

    const task = new Task(title, description, dueDate)

    const projectName = document.getElementById('project-wrapper').firstChild.innerHTML
    
    let project = appBrain.projectArray.find(item =>{
            if (item.title === projectName){
                return item
            }
    })
    
    project.taskArray.push(task)

    document.getElementById('taskFormWrapper').remove()

    enableAddProjectButton()

    displayActiveProject(project)
    
}




export {createDomElement, renderIcon, updateActive, enableAddProjectButton, disableAddProjectButton, addProjectOrTaskButton, newTaskTemplateForm, getCurrentDate}


