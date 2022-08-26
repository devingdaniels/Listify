import { renderIcon, enableAddProjectButton, addProjectOrTaskButton } from '../utils/helperFunctions'
import { Project } from './project'
import DotOptionsIcon from '../assets/dots-vertical-icon.svg'
import { updateActive } from '../utils/helperFunctions'

export class AppBrain{

    constructor(){
        this.projectArray = []
        this.container = this.projectAnchor()
    }
    displayProjects(project){
        const anchor = document.getElementById('userProjectSection')
        anchor.innerHTML = ""

        this.projectArray.forEach(item => {
            

            const container = document.createElement('div')

            container.classList.add('userProjectItem')
            if (project === item) {
                container.classList.add('active')
            }
            
            const options = renderIcon(DotOptionsIcon, "Icon of dots option svg", 'sidebar-tab-icon')
            options.addEventListener('click', ()=>{
                showProjectOptionPanel()
            })

            const h3 = document.createElement('h3')
            h3.innerHTML = item.title
            h3.style.cursor = "pointer"
            h3.addEventListener('click', ()=>{                   
                updateActive(h3.parentElement, 'userProjectItem' )
                const array = this.projectArray.filter(item => {
                    if (item.title == h3.innerHTML){
                        return item
                    }
                })
                const item = array[0]
                displayActiveProject(item)
            })


           container.append(h3)
           container.append(options)
           anchor.append(container)
        })
    }

    resetProjectSection(){
        document.getElementById('project-wrapper').innerHTML = ""
    }


    
    displayNewProjectForm(){
        let temp = document.getElementById('project-section')
        const anchor = temp.firstChild
        const container = document.createElement('div')
        container.classList.add('projectFormContainer')
    
        const input = document.createElement('input')
        input.id = "projectTitleData"
        input.style.display = "block"
        input.placeholder = "Project title"
        // Add code to prevent user from submitting with enter

        const buttonWrapper = document.createElement('div')
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

            const isFound = this.projectArray.some(item =>{
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
                this.projectArray.push(project)                                
                // Enable the add project button
                enableAddProjectButton()
                const userProjectSection = document.getElementById('userProjectSection')
                userProjectSection.innerHTML = ""

                container.remove()

                this.displayProjects(project)  
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
        anchor.append(container)    
    }



    displayToday(){       
        this.container.append(createTabTitle("Today"))

        // method to display all tasks with a due date of current date
    }

    displayInbox(){       
        this.container.append(createTabTitle("Inbox"))

        // method to display all tasks with a due date of current date
    }
    
    displayMonth(){
        this.container.append(createTabTitle("Month"))


        // method to display all tasks due in next 30 days

    }
    projectAnchor(){
        return document.getElementById('project-wrapper')
    }
}



function displayCurrentProjectFile(project){
   


}


function showProjectOptionPanel(){
    alert('Show options for edit name or delete')
}



function createTabTitle(tab){
    const title = document.createElement('h1')
    title.innerHTML = tab
    title.style.fontSize = "40px"
    title.style.textAlign = "center"        
    return title
}

function displayActiveProject(project){
    const anchor = document.getElementById('project-wrapper')
           
    anchor.innerHTML = ""
    anchor.append(createTabTitle(project.title))
        

    // Append div for adding new task
    const addTaskButton = addProjectOrTaskButton("Add Task")
    addTaskButton.addEventListener('click', ()=>{
        createNewUserTask(project)
    })

    anchor.append(addTaskButton)


    // Display all current tasks listed under this project
    project.taskArray.forEach(task => {
        anchor.append(displayProjectTasks(task))
    })
}

function createNewUserTask(project){
    TEST()
}


function displayProjectTasks(task){
    const container = document.createElement('h1')
    container.innerHTML = task
    return container
}


function TEST(){


    alert('Display a new task form')
    // const nameLabel = document.createElement('label')
    // nameLabel.textContent = "Task Name"
    // const taskName = document.createElement('input')
    // taskName.placeholder = "Task name"
    
    // const taskInfo = document.createElement('input')
    // taskInfo.placeholder = "Task description"



    // const saveButton = document.createElement('button')
    // saveButton.innerHTML = "Save"
    
    // el.append(nameLabel)
    // el.append(taskName)
    // el.append(taskInfo)
    // el.append(saveButton)
    
}