import {createNewProjectTabSection} from '../utils/createProjectTab'
import { createNewTaskButton } from '../utils/helperFunctions'

export class Listify{

    constructor(){
        this.projectArray = []    
    }

    displayAllTasks(){
         // Clear the previous content in the display section
        clearCurrentViewWrapper()
        // Display name of current view
        getCurrentViewWrapper().append(createCurrentViewHeading('All Tasks'))
        // Display the name of the tab at the top of the page 
        // Iterate over each project
        // On each project, call display all tasks 
        // Append each task with the template task UI to the displayAllTasks tab view
    }


    displayToday(){
        // Clear the previous content in the display section
        clearCurrentViewWrapper()
        getCurrentViewWrapper().append(createCurrentViewHeading('Today'))
        // Display the name of the tab at the top of the page 
        // Iterate over each project
        // On each project, iterate over each task - display if task has dueDate of today
        // Append each task with the template task UI to the displayToday tab view
    }


    displayNextSevenDays(){
        // Clear the previous content in the display section
        clearCurrentViewWrapper()
        // Display name of current view
        getCurrentViewWrapper().append(createCurrentViewHeading('Next 7 Days'))
        // Display the name of the tab at the top of the page 
        // Iterate over each project
        // On each project, iterate over each task - display if task has dueDate of today or falls within the next 7 days
        // Append each task with the template task UI to the displayNextSevenDays tab view
    }

    displayFavorites(){
         // Clear the previous content in the display section
         clearCurrentViewWrapper()
        // Display name of current view
        getCurrentViewWrapper().append(createCurrentViewHeading('Favorites'))
        // Display the name of the tab at the top of the page 
        // Iterate over each project
        // On each project, iterate over each task - display if task has favorites TRUE
        // Append each task with the template task UI to the displayFavorites tab view
    }

    displayCurrentProject(projectTitle){
         // Clear the previous content in the display section
        clearCurrentViewWrapper()
        // Display name of current project
        getCurrentViewWrapper().append(createCurrentViewHeading(projectTitle))
        // Create and append a 'add new task' button under the heading
        createNewTaskButton()
        // Display the current project tasks under the 'add task' button
        this.displayCurrentProjectTasks(this.getCurrentProject())
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

    getCurrentProject(){
        // Get the title of the current project in the view 
        const projectTitle = document.getElementById('current-view-wrapper').firstChild.innerHTML
        // Traverse and find the object with matching title
        for(let i = 0; i < this.projectArray.length; i++){
            if (this.projectArray[i].projectTitle === projectTitle ){
                return this.projectArray[i]
            }
        }
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
            const taskContainer  = task.createTaskContainer(title, description, dueDate)
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