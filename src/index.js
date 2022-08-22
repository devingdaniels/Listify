import './style.css'
import {createHeader} from './App/createHeaderSection'
import { createSideBar } from './App/createSidePanel'
import { createFooter } from './App/utils/createFooter'
import {createAddTaskButton} from './App/createAddTaskButton'




import { AppBrain } from './App/classes/appBrain'

function renderWebsite(){
    createHeader()
    createSideBar()
    createFooter()
    createAddTaskButton()   
    taskAppBrain()
}


function taskAppBrain(){
    const appBrain = new AppBrain()
    return appBrain
}

 renderWebsite()


export {taskAppBrain}