import TrashCanIcon from '../assets/Trashcan-icon.svg'
import { renderIcon, enableAddProjectButton } from '../utils/helperFunctions'
import { Project } from './project'
import DotOptions from '../assets/dots-vertical-icon.svg'

export class AppBrain{

    constructor(){
        this.projectArray = []
        this.container = this.projectAnchor()
    }



    displayProjects(){
        const anchor = document.getElementById('userProjectSection')
        anchor.innerHTML = ""
        this.projectArray.forEach(item => {
            const container = document.createElement('div')
            container.classList.add('userProjectItem')
            const options = renderIcon(DotOptions, "Icon of dots option svg", 'sidebar-tab-icon')
            const h3 = document.createElement('h3')
            h3.innerHTML = item.title
           container.append(h3)
           container.append(options)
           anchor.append(container)
        })
    }

    displayInbox(){
            
    }

    displayToday(){       
        this.container.append(this.createTabTitle("Today"))

        // method to display all tasks with a due date of current date


    }
    displayMonth(){
        this.container.append(this.createTabTitle("Month"))


        // method to display all tasks due in next 30 days

    }

    createTabTitle(tab){
        const title = document.createElement('h1')
        title.innerHTML = tab
        title.style.fontSize = "40px"
        title.style.textAlign = "center"        
        return title
    }
    projectAnchor(){
        return document.getElementById('project-wrapper')
    }
    resetProjectSection(){
        document.getElementById('project-wrapper').innerHTML = ""
    }

    displayNewProjectForm(){

        const anchor = document.getElementById('project-section')

        const container = document.createElement('div')
        container.classList.add('projectFormContainer')
    
        const input = document.createElement('input')
        input.id = "projectTitleData"
        input.style.display = "block"
        input.placeholder = "Project title"
        // Add code to prevent user from submitting with enter

        const save = document.createElement('button')
        save.textContent = "Save"
        save.type = "button"
        const cancel = document.createElement('button')
        cancel.textContent = "Cancel"
        cancel.type = "button"
    
        save.addEventListener('click', () =>{  
            const projectTitle = document.getElementById('projectTitleData')  
            if (projectTitle.value !== ""){
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
                this.displayProjects()  
                // clear section data before updating                
                console.log(this.projectArray)      
            }
            else if(projectTitle.value === ""){
                alert('need valid title')
            }        
        })
    
        cancel.addEventListener('click', ()=>{
            // Remove the input form 
            container.remove()
            // Reshow the add project button
            enableAddProjectButton()
            
        })
    
    
        container.append(input)
        container.append(save)
        container.append(cancel)
        anchor.append(container)    
    }
}


