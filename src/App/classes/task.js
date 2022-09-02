// Methods
import { renderIcon } from '../utils/helperFunctions'
import {toggleTaskFavoriteStatus, showEditTaskPanel, toggleTaskIsComplete} from '../eventListeners'
// Images
import StarOutlineIcon from '../assets/star-outline-icon.svg'
import OptionDots from '../assets/dots-vertical-icon.svg'


export class Task{
    constructor(taskTitle = '', taskDescription = '', dueDate ='', projectTitle= '' ){
        this.taskTitle = taskTitle
        this.taskDescription = taskDescription
        this.dueDate = dueDate
        this.isFavorite = false
        this.projectTitle = projectTitle

       
    }
}


Task.prototype.displayPrettyTask = function (taskTitle, description, dueDate, projectTitle){
   const taskContainer = document.createElement('div')
   taskContainer.classList.add('prettyTaskContainer')
   taskContainer.id = projectTitle
   // Check box for marking task complete
   const markComplete = document.createElement('input')
   markComplete.type = 'checkbox'
   markComplete.classList.add('task-checkbox-complete')
   markComplete.addEventListener('click', toggleTaskIsComplete)
   // Title
   // description 
   const taskInfoWrapper = document.createElement('div')
   taskInfoWrapper.classList.add('taskInfoWrapper')
   const titleSection = document.createElement('h3')
   titleSection.innerHTML = taskTitle
   const descriptionSection = document.createElement('p')
   descriptionSection.innerHTML = description
   taskInfoWrapper.append(titleSection)
   taskInfoWrapper.append(descriptionSection)
   // due duedate
   const dueDateWrapper = document.createElement('div')
   dueDateWrapper.classList.add('taskDueDateWrapper')
   if (dueDate !== ''){
    dueDateWrapper.innerHTML = dueDate
   }else{
    dueDateWrapper.innerHTML = "No Date"
   }
   

   // Favorite option
   const starDotsWrapper = document.createElement('div')
   starDotsWrapper.classList.add('starDotsWrapper')
   const star = renderIcon(StarOutlineIcon, 'Image of a star icon', 'sidebarTabViewIcon')
   star.addEventListener('click', ()=>{

        


        toggleTaskFavoriteStatus(taskTitle, projectTitle)
   })
   // Edit task vertical dots option
   const optionIcon = renderIcon(OptionDots, 'Image of a three vertical dots', 'sidebarTabViewIcon')
   optionIcon.addEventListener('click', showEditTaskPanel)
   starDotsWrapper.append(star)
   starDotsWrapper.append(optionIcon)



   
   taskContainer.append(markComplete)
   taskContainer.append(taskInfoWrapper)
   taskContainer.append(dueDateWrapper)
   taskContainer.append(starDotsWrapper)

    return taskContainer

}
