import { renderIcon, addProjectOrTaskButton, newTaskTemplateForm, disableAddProjectButton, getCurrentDate } from '../utils/helperFunctions'
import DotOptionsIcon from '../assets/dots-vertical-icon.svg'
import { updateActive } from '../utils/helperFunctions'


import { add } from 'date-fns'


export class AppBrain{

    constructor(){
        this.projectArray = []
        this.container = this.projectAnchor()
    }
    projectAnchor(){
        return document.getElementById('project-wrapper')
    }

    resetProjectSection(){
        document.getElementById('project-wrapper').innerHTML = ""
    }

    displayActiveView(currentView){
    // Reset the current project section
    this.resetProjectSection()
   
    if (currentView === "Inbox"){     
       this.displayInbox()     
    }
    else if (currentView === "Today"){     
       this.displayToday()
    }
   
    else if (currentView === "Month"){     
       this.displayMonth()     
    }
   }
   

    displayInbox(){       
        const anchor = document.getElementById('project-wrapper')
        anchor.innerHTML = ''
        this.container.append(createTabTitle("Inbox"))
        this.projectArray.forEach(project =>{
            project.taskArray.forEach(task =>{
                anchor.append(displayProjectTasks(task))
            })
        })
    }

    displayToday(){       
               
        const anchor = document.getElementById('project-wrapper')
        anchor.innerHTML = ''
        this.container.append(createTabTitle("Today")) 
        this.projectArray.forEach(project =>{
            project.taskArray.forEach(task =>{                
                if (task.dueDate === getCurrentDate()){
                    anchor.append(displayProjectTasks(task))
                }                                
            })
        })        
    }
    
    displayMonth(){
        
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
            
            const options = renderIcon(DotOptionsIcon, "Icon of dots option svg", 'sidebarTabIcon')
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
}




function showProjectOptionPanel(){
    alert('Show options for edit name or delete')
}


function createTabTitle(tab){
    const title = document.createElement('h1')
    title.classList.add('projectSectionHeading')
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
    addTaskButton.id = 'add-new-task-button'
    addTaskButton.addEventListener('click', ()=>{
        createNewUserTask(project)
    })

    anchor.append(addTaskButton)

    // Display all current tasks listed under this project
    project.taskArray.forEach(task => {
        anchor.append(displayProjectTasks(task))
    })
}

function displayProjectTasks(task){
    const container = document.createElement('div')
    container.classList.add('displayedTask')

    const titleWrapper = document.createElement('div')
    titleWrapper.classList.add('currentTaskItemWrapper')
    const titleLabel = document.createElement('label')
    titleLabel.innerHTML = 'Title'
    const titleBody = document.createElement('p')
    titleBody.innerHTML = task.title
    titleWrapper.append(titleLabel)
    titleWrapper.append(titleBody)



    const descriptionWrapper = document.createElement('div')
    descriptionWrapper.classList.add('currentTaskItemWrapper')
    const descriptionLabel = document.createElement('label')
    descriptionLabel.innerHTML = "Description"
    const descriptionBody = document.createElement('p')
    descriptionBody.innerHTML = task.description
    descriptionWrapper.append(descriptionLabel)
    descriptionWrapper.append(descriptionBody)


    const dueDateWrapper = document.createElement('div')
    dueDateWrapper.classList.add('currentTaskItemWrapper')
    const dueDateLabel = document.createElement('label')
    dueDateLabel.innerHTML = "Due"
    const dueDateBody = document.createElement('p')

    dueDateBody.innerHTML = formatJSDate(task.dueDate)
    dueDateWrapper.append(dueDateLabel)
    dueDateWrapper.append(dueDateBody)

    container.append(titleWrapper)
    container.append(descriptionWrapper)
    container.append(dueDateWrapper)


    return container
}



function createNewUserTask(project){
    const anchor = document.getElementById('project-wrapper')
    const taskForm = newTaskTemplateForm()


    disableAddProjectButton()

    anchor.append(taskForm)

}
function formatJSDate(date){
    const string = String(date)
    date = ''        
    
    for (let i = 5; i < 10; i++){
        date += string[i]
    }
    date += '-'
    for(let i = 0; i < 4; i++){
        date += string[i]
    }
    return date    
}

function getParsedDate(date){

    let dateObject = {
        yyyy: "" ,
        dd: "",
        mm: ""
    }

    let temp = ''
    for (let i = 0; i < 4; i++){
        temp += date[i]
    }
    dateObject.yyyy = temp

    temp = ''
    for (let i = 5; i < 7; i++){
        temp += date[i]
    }
    dateObject.mm = temp

    temp = ''

    for (let i = 9; i < 10; i++){        
        temp += date[i]
    }
    dateObject.dd = temp

    return dateObject
}

export {displayActiveProject}