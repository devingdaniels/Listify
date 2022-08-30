import './style.css'
import { createHeader, createSidePanel, createFooter } from "./App/UI";



document.getElementById('header-wrapper').append(createHeader())
document.getElementById('sidebar-wrapper').append(createSidePanel())
document.getElementById('footer-wrapper').append(createFooter())