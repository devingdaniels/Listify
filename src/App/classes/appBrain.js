import TrashCanIcon from '../assets/Trashcan-icon.svg'
import { renderIcon } from '../utils/helperFunctions'

export class AppBrain{
    
    constructor(){
        this.listArray = []
        this.container = this.projectAnchor()
    }


    createTask(){


        const task = document.createElement('div')
        task.classList.add('task-container')
    

        const inputSaveWrapper = document.createElement('div')
        const input = document.createElement('input')
        const saveButton = document.createElement('button')
        

        saveButton.innerHTML = this.listArray.length

        inputSaveWrapper.append(input)
        inputSaveWrapper.append(saveButton)




        const trashCanIcon = renderIcon(TrashCanIcon, "Picture of trashcan icon", 'trash-task-icon')
        trashCanIcon.id = this.listArray.length
        trashCanIcon.addEventListener('click', ()=>{

            alert('code remove a task functionality')

            // const index = Number(trashCanIcon.id)
            // console.log(index)
            // this.listArray.splice(index, 1)
            // console.log(this.listArray)

        })

        
        task.append(inputSaveWrapper)
        task.append(trashCanIcon)

        this.listArray.push(task)


    }

    displayInbox(){
        this.resetProjectSection()
        this.container.append(this.createTabTitle("Inbox"))        
        this.listArray.forEach(item => {
            this.projectAnchor().append(item)
        })        
    }

    displayToday(){       
        this.container.append(this.createTabTitle("Today"))

        // method to display all tasks with a due date of current date


    }
    displayMonth(){
        this.container.append(this.createTabTitle("Month"))


        // method to display all tasks due in next 30 days

    }

    createTabTitle(tab){
        const title = document.createElement('h1')
        title.innerHTML = tab
        title.style.fontSize = "40px"
        title.style.textAlign = "center"        
        return title
    }
    projectAnchor(){
        return document.getElementById('project-wrapper')
    }
    resetProjectSection(){
        document.getElementById('project-wrapper').innerHTML = ""
    }
}