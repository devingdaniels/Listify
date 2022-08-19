import './style.css'
import { createSideBar } from './App/createSidePanel'



function renderWebsite(){

    document.querySelector('main').append(createSideBar())

}


renderWebsite()