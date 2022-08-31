import {createNewProjectTabSection} from '../utils/createProjectTab'

export class Listify{

    constructor(){
        this.projectArray = []
        
    }

    displayAllTasks(){
        alert('Display all tasks triggered')
        // Display the name of the tab at the top of the page 
        // Iterate over each project
        // On each project, call display all tasks 
        // Append each task with the template task UI to the displayAllTasks tab view
    }


    displayToday(){
        alert('Display today triggered')
        // Display the name of the tab at the top of the page 
        // Iterate over each project
        // On each project, iterate over each task - display if task has dueDate of today
        // Append each task with the template task UI to the displayToday tab view
    }


    displayNextSevenDays(){
        alert('Display displayNextSevenDays triggered')
        // Display the name of the tab at the top of the page 
        // Iterate over each project
        // On each project, iterate over each task - display if task has dueDate of today or falls within the next 7 days
        // Append each task with the template task UI to the displayNextSevenDays tab view
    }

    displayFavorites(){
        alert('Display displayFavorites triggered')
        // Display the name of the tab at the top of the page 
        // Iterate over each project
        // On each project, iterate over each task - display if task has favorites TRUE
        // Append each task with the template task UI to the displayFavorites tab view
    }

    displayCurrentProject(){
        alert('Display displayCurrentProject triggered')
        // Display the name of the project at the top of the page 
        // For the project, iterate and display each task
    }

    displayAllCurrentProjectsSidebar(){
        // Anchor for appending new project tabs 
        const projectAnchor = document.getElementById('new-project-container-anchor')
        // Clear exisiting UI before appeding
        projectAnchor.innerHTML = ""
        this.projectArray.forEach(project =>{
            projectAnchor.append(createNewProjectTabSection(project.projectTitle))
        })
    }

    isDuplicateTitle(title){
        console.log(title)
       return this.projectArray.some(project => project.projectTitle === title )
       }
    
}


