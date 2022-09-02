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
        this.projectTitle = projectTitle
        this.isFavorite = false
    }
}


Task.prototype.displayPrettyTask = function (taskTitle, description, dueDate, projectTitle, favStatus){
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
   const star = document.createElement('i')
   star.classList.add('fa-star')
   if (favStatus === true){
    star.classList.remove("fa-regular")
    star.classList.add("fa-solid")
}else if (favStatus === false){
    star.classList.remove("fa-solid")
    star.classList.add("fa-regular")
}
  
      
   star.addEventListener('click', e =>{
        toggleTaskFavoriteStatus(taskTitle, projectTitle, e.target)
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