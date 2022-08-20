import './style.css'
import { createSideBar } from './App/createSidePanel'
import {createHeader} from './App/createHeaderSection'
import {createAddTaskButton} from './App/createAddTaskButton'
import { createFooter } from './App/utils/createFooter'










function renderWebsite(){
    const main = document.getElementById('main')
    const mainGridLayout = document.getElementById('main-grid-layout')

    mainGridLayout.append(createHeader())
    main.append(createSideBar())
    main.append(createFooter())
    createAddTaskButton()
}
    
renderWebsite()


