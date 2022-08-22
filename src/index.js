import './style.css'
import { createSideBar } from './App/createSidePanel'
import {createHeader} from './App/createHeaderSection'
import {createAddTaskButton} from './App/createAddTaskButton'
import { createFooter } from './App/utils/createFooter'



function renderWebsite(){

    createHeader()
    createSideBar()
    createFooter()
    createAddTaskButton()
}
    
renderWebsite()


