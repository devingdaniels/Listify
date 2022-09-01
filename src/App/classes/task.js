export class Task{
    constructor(taskTitle = '', taskDescription = '', dueDate ='' ){
        this.taskTitle = taskTitle
        this.taskDescription = taskDescription
        this.dueDate = dueDate
        this.isFavorite = false

       
    }
}


Task.prototype.createTaskContainer = function (title, description, dueDate){
   return title + description + dueDate

}
