import './style.css'
import { createSideBar } from './App/createSidePanel'
import {createHeader} from './App/createHeaderSection'
import {createAddTaskButton} from './App/createAddTaskButton'
import { createFooter } from './App/utils/createFooter'



function renderWebsite(){

    const headerWrapper = document.getElementById('header-wrapper')
    const sidebarWrapper = document.getElementById('sidebar-wrapper')
    const footerWrapper = document.getElementById('footer-wrapper')


    headerWrapper.append(createHeader())
    sidebarWrapper.append(createSideBar())
    footerWrapper.append(createFooter())
    createAddTaskButton()
}
    
renderWebsite()


