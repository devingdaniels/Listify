export class AppBrain{
    
    constructor(){
        this.listArray = []
        this.container = this.projectAnchor()
    }

    displayInbox(){
        this.container.append(this.createTabTitle("Inbox"))
        
        // method to display all tasks in the array 
        
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
}



// updateSideBarTitleSection(){
//     const projectSection = document.getElementById('project-section')
//     const h1 = document.createElement('h3')
//     h1.textContent = this.title
//     projectSection.append(h1)

// }

// addProjectSection(){
//     const projectSection = document.getElementById('project-wrapper')
//     projectSection.append(this.title)
// }

// createNewProject(){

//     let arr = []
    
//         const wrapper = document.createElement('div')
//         wrapper.classList.add('add-project-input')

//         const input = document.createElement('input')
//         input.type = "text"
//         arr.push(input)
        
//         const saveButton = document.createElement('button')
//         saveButton.innerHTML = "save"
//         const cancelButton = document.createElement('button')
//         cancelButton.innerHTML = "cancel"


//         cancelButton.innerHTML = "cancel"

//         saveButton.addEventListener('click', save =>{
//             wrapper.innerHTML = ""
//             const project = new Project(input.value)
//             project.updateSideBarTitleSection()
//             project.addProjectSection()


//             const addButton  = document.getElementById('project-add-button')
//             addButton.style.pointerEvents = "all"
            
//         })

//         cancelButton.addEventListener('click', cancel =>{
//             wrapper.innerHTML = ""
//             const addButton  = document.getElementById('project-add-button')
//             addButton.style.pointerEvents = "all"
//             wrapper.remove(wrapper)
//         })


//         arr.push(input)
//         arr.push(saveButton)
//         arr.push(cancelButton)

//         arr.forEach(el => {
//             wrapper.append(el)
//         })

//         return wrapper
// }
