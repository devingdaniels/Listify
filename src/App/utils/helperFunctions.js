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


function updateActive(tabItem){
    if (tabItem.classList.contains('active')) return null
    // Update the current active tab
    const viewTabs = document.querySelectorAll('.sidebar-tab')
    viewTabs.forEach(item =>{
        if (item !== tabItem){
            item.classList.remove('active')
        }
    })    
    tabItem.classList.add('active')
}

function enableAddProjectButton(){
    const projectButton = document.getElementById('addProjectIcon')
    projectButton.style.pointerEvents = "auto"
}
function disableAddProjectButton(){
    const projectButton = document.getElementById('addProjectIcon')
    projectButton.style.pointerEvents = "none"
}

export {createDomElement, renderIcon, updateActive, enableAddProjectButton, disableAddProjectButton}


