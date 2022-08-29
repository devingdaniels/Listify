import PlusIcon from '../assets/plus-icon.svg'
import { Task } from '../classes/task'
import { appBrain } from '../../index.js'
import { displayActiveProject } from '../classes/appBrain'
import { Project } from '../classes/project'


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
    formWrapper.id = ('task-form-wrapper')
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

    // Get the name of the project
    const projectName = document.getElementById('project-wrapper').firstChild.innerHTML
    
    // Find the project object in the app brain and return
    const project = appBrain.projectArray.find(item =>{
            if (item.title === projectName){
                return item
            }
    })
    
    project.taskArray.push(task)

    document.getElementById('task-form-wrapper').remove()

    enableAddProjectButton()

    displayActiveProject(project)
    
}


function displayNewProjectForm(){
    const anchor = document.getElementById('newProjectTitleAnchor')
    
    const container = document.createElement('div')
    container.classList.add('projectFormContainer')

    const input = document.createElement('input')
    input.id = "projectTitleData"
    input.style.display = "block"
    input.placeholder = "Project title"
    // Add code to prevent user from submitting with enter

    const buttonWrapper = document.createElement('div')
    buttonWrapper.classList.add('add-project-button-wrapper')
    const save = document.createElement('button')
    save.textContent = "Save"
    save.type = "button"
    const cancel = document.createElement('button')
    cancel.textContent = "Cancel"
    cancel.type = "button"

    save.id = ('saveNewProject')
    cancel.id = ('cancelNewProject')

    buttonWrapper.append(save)
    buttonWrapper.append(cancel)



    save.addEventListener('click', () =>{  
        const projectTitle = document.getElementById('projectTitleData') 

        const isFound = appBrain.projectArray.some(item =>{
            if (item.title === projectTitle.value){                    
                return true
            }
            return false
        })

        if (isFound){
            alert('Project title already exists. Please edit.')
        }

       else  if (projectTitle.value !== ""){
            // Create a new project object
            const project = new Project()
            // Save the title
            project.title = projectTitle.value
            // Push the object onto the appBrain array
            appBrain.projectArray.push(project)                                
            // Enable the add project button
            enableAddProjectButton()
            const userProjectSection = document.getElementById('userProjectSection')
            userProjectSection.innerHTML = ""

            container.remove()

            appBrain.displayProjects(project)  
            // clear section data before updating                
                  
        }
        else if(projectTitle.value === ""){
            alert('Enter a valid project title')
        }        
    })

    cancel.addEventListener('click', ()=>{
        // Remove the input form 
        container.remove()
        // Reshow the add project button
        enableAddProjectButton()
        
    })

    container.append(input)        
    container.append(buttonWrapper)
    anchor.appendChild(container)
}




export {createDomElement, renderIcon, updateActive, enableAddProjectButton, disableAddProjectButton, addProjectOrTaskButton, newTaskTemplateForm, getCurrentDate, displayNewProjectForm}


