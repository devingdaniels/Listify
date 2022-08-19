import './style.css'
import { createSideBar } from './App/createSidePanel'
import {createHeader} from './App/createHeaderSection'



document.getElementById('main-grid-layout').append(createHeader())
document.getElementById('main').append(createSideBar())

    



