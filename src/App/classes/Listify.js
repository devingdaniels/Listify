import {createNewProjectTabSection} from '../utils/createProjectTab'
import { createNewTaskButton, getCurrentDate, addSevenDays } from '../utils/helperFunctions'

export class Listify{

    constructor(){
        this.projectArray = []    
    }

    displayAllTasks(){
         // Clear the previous content in the display section
        clearCurrentViewWrapper()
        // Display name of current view
        getCurrentViewWrapper().append(createCurrentViewHeading('All Tasks'))

        this.projectArray.forEach(project =>{
            project.taskArray.forEach(task=>{                
                const el = task.displayPrettyTask(task.taskTitle, task.taskDescription, task.dueDate, project.projectTitle, task.isFavorite, task.isComplete)
                getCurrentViewWrapper().append(el)                
            })
        })        
    }
    displayToday(){
        // Clear the previous content in the display section
        clearCurrentViewWrapper()
        getCurrentViewWrapper().append(createCurrentViewHeading('Today'))
       
        this.projectArray.forEach(project =>{
            project.taskArray.forEach(task =>{
                    if (task.dueDate === getCurrentDate()){
                        const el = task.displayPrettyTask(task.taskTitle, task.taskDescription, task.dueDate, project.projectTitle, task.isFavorite, task.isComplete)
                    getCurrentViewWrapper().append(el)
                    }
            })
        })
    }
    displayNextSevenDays(){
        // Clear the previous content in the display section
        clearCurrentViewWrapper()
        // Display name of current view
        getCurrentViewWrapper().append(createCurrentViewHeading('Next 7 Days'))
        this.projectArray.forEach(project =>{
            project.taskArray.forEach(task=>{
                if (task.dueDate < addSevenDays(getCurrentDate())){
                    const el = task.displayPrettyTask(task.taskTitle, task.taskDescription, task.dueDate, project.projectTitle, task.isFavorite, task.isComplete)
                    getCurrentViewWrapper().append(el)
                }
            })
        })

    }
    displayFavorites(){
         // Clear the previous content in the display section
         clearCurrentViewWrapper()
        // Display name of current view
        getCurrentViewWrapper().append(createCurrentViewHeading('Favorites'))
        
        this.projectArray.forEach(project =>{
            project.taskArray.forEach(task=>{
                if (task.isFavorite === true){
                    const el = task.displayPrettyTask(task.taskTitle, task.taskDescription, task.dueDate, project.projectTitle, task.isFavorite, task.isComplete)
                    getCurrentViewWrapper().append(el)
                }
            })
        })
    }

    displayCurrentProject(projectTitle){
         // Clear the previous content in the display section
        clearCurrentViewWrapper()
        // Display name of current project
        getCurrentViewWrapper().append(createCurrentViewHeading(projectTitle))
        // Create and append a 'add new task' button under the heading
        createNewTaskButton()
        // Display the current project tasks under the 'add task' button
        this.displayCurrentProjectTasks(this.getCurrentProject(projectTitle))
    }

    displayAllCurrentProjectsSidebar(){
        // Anchor for appending new project tabs 
        const projectAnchor = document.getElementById('new-project-container-anchor')
        // Clear existing UI before appending
        projectAnchor.innerHTML = ""
        this.projectArray.forEach(project =>{
            projectAnchor.append(createNewProjectTabSection(project.projectTitle))
        })
    }

    isDuplicateTitle(title){
       return this.projectArray.some(project => project.projectTitle === title )
       }

    getCurrentProject(projectTitle){
        // Get the title of the current project in the view 
       return  this.projectArray.find(project => project.projectTitle === projectTitle)
    }
    getCurrentTask(taskTitle){
        
    }
    displayCurrentProjectTasks(project){
        // For each task
        // Get task info, append to task display container
        // Append each container to the project section 
        project.taskArray.forEach(task =>{
            // Get the data from each task
            const title = task.taskTitle
            const description = task.taskDescription
            const dueDate = task.dueDate
            // Use data to create task display container within the current project
            const taskContainer  = task.displayPrettyTask(title, description, dueDate, project.projectTitle, task.isFavorite, task.isComplete)
            // Append the task container to the dom in the project section
            getCurrentViewWrapper().append(taskContainer)
        })
    }
}


// Helper functions for Project class
function clearCurrentViewWrapper(){
    document.getElementById('current-view-wrapper').innerHTML = ''
}
function getCurrentViewWrapper(){
    return document.getElementById('current-view-wrapper')
}

function createCurrentViewHeading(title){
    const heading = document.createElement('h1')
    heading.innerHTML = title
    heading.classList.add('currentViewHeadingWrapper')
    return heading
}