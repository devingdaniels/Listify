import PlusIcon from '../assets/plus-icon.svg'

function createDomElement(type, classList){
    const el = document.createElement(type)
    if (classList !== ""){
        el.classList.add(classList)
    }    
    return el
}

function renderIcon(image, alt, styleClass){
    const img = new Image()
    img.src = image
    img.alt = alt
    img.classList.add(`${styleClass}`)
    return img
}


function updateActive(tabItem, className){
    if (tabItem.classList.contains('active')) return null
    // Update the current active tab
    const viewTabs = document.querySelectorAll('.' + className)
    viewTabs.forEach(item =>{
        if (item !== tabItem){
            item.classList.remove('active')
        }
    })    
    tabItem.classList.add('active')
}

function enableAddProjectButton(){
    const projectButton = document.getElementById('iconSpanContainer')
    projectButton.style.display = "flex"
}
function disableAddProjectButton(){
    const projectButton = document.getElementById('iconSpanContainer')
    projectButton.style.display = "none"
}

function addProjectOrTaskButton(label){    
    const iconSpanContainer = document.createElement('div')
    iconSpanContainer.classList.add('iconSpanContainer')
    const plusIcon = renderIcon(PlusIcon, "Icon plus sign", "newProjectIcon")
    plusIcon.id = "addProjectIcon"
    const span = document.createElement('span')
    span.textContent = label
    span.style.cursor = 'pointer'
    iconSpanContainer.append(plusIcon)
    iconSpanContainer.append(span)
    return iconSpanContainer
}

export {createDomElement, renderIcon, updateActive, enableAddProjectButton, disableAddProjectButton, addProjectOrTaskButton}


