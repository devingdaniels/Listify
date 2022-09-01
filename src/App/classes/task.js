export class Task{
    constructor(taskTitle = '', taskDescription = '', dueDate ='' ){
        this.taskTitle = taskTitle
        this.taskDescription = taskDescription
        this.dueDate = dueDate
        this.isFavorite = false

       
    }
}


Task.prototype.createTaskContainer = function (){
    alert('Returns a task form')
}
