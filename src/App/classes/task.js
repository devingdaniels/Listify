// Methods
import { renderIcon } from '../utils/helperFunctions'
import {toggleTaskFavoriteStatus, showEditTaskPanel, toggleTaskIsComplete} from '../eventListeners'
// Images
import OptionDots from '../assets/dots-vertical-icon.svg'


export class Task{
    constructor(taskTitle = '', taskDescription = '', dueDate ='', projectTitle= ''){
        this.taskTitle = taskTitle
        this.taskDescription = taskDescription
        this.dueDate = dueDate
        this.projectTitle = projectTitle
        this.isFavorite = false
        this.isComplete = false
    }
}


Task.prototype.displayPrettyTask = function (taskTitle, description, dueDate, projectTitle, isFavorite, isComplete){
   const taskContainer = document.createElement('div')
   taskContainer.classList.add('prettyTaskContainer')
   taskContainer.id = projectTitle
   // Check box for marking task complete
   const markComplete = document.createElement('i')
   if (isComplete === true){
    markComplete.classList.add('fa-solid','fa-circle-check')
    markComplete.classList.remove('fa-regular','fa-circle')
   }else if (isComplete === false){
    markComplete.classList.add('fa-regular','fa-circle') // empty circle 
    markComplete.classList.remove('fa-solid','fa-circle-check')
   }
   markComplete.addEventListener('click', e =>{
    console.log(e.target)
    toggleTaskIsComplete(taskTitle, projectTitle, e.target)
   })
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
   if (isFavorite === true){
    star.classList.remove("fa-regular")
    star.classList.add("fa-solid")
}else if (isFavorite === false){
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