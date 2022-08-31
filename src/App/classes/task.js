export class Task{
    constructor(taskTitle = '', taskDescription = '', isFavorite= '', dueDate =''){
        this.taskTitle = taskTitle
        this.taskDescription = taskDescription
        this.isFavorite = isFavorite
        this.dueDate = dueDate
    }
}


Task.prototype.createTaskForm = function (){
    alert('Returns a task form')
}
