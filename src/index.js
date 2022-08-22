import './style.css'
import {createHeader} from './App/createHeaderSection'
import { createSideBar } from './App/createSidePanel'
import { createFooter } from './App/utils/createFooter'
import {createAddTaskButton} from './App/createAddTaskButton'


function renderWebsite(){
    createHeader()
    createSideBar()
    createFooter()
    createAddTaskButton()   
}

renderWebsite()


