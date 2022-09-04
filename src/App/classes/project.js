export class Project{
    constructor(title = '_unknown'){
        this.projectTitle = title
        this.taskArray = []
    }
}


Project.prototype.getCurrentTask = function(taskTitle){
    return this.taskArray.find(task => task.taskTitle === taskTitle)
}

