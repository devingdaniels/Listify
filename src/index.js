import './style.css'
import {createHeader} from './App/createHeaderSection'
import { createSidePanel } from './App/createSidePanel'
import { createFooter } from './App/createFooter'
import { AppBrain } from './App/classes/appBrain'


const appBrain = new AppBrain()

renderWebsite()

function renderWebsite(){
    createHeader()
    createSidePanel()
    createFooter()  
   
}
 
export {appBrain}