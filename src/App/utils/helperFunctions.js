function renderIcon(image, alt, styleClass){
    if (image === '' || image === null) return 
    const img = new Image()
    img.src = image
    img.alt = alt
    if (styleClass !== '' && styleClass !== null){
        img.classList.add(`${styleClass}`)
    }
    return img
}

function toggleDarkMode(){
    alert('code dark mode theme')
}

function hideNewProjectButton(){
    const button = document.getElementById('new-project-button')
    button.style.display = 'none'
}

function showNewProjectButton(){
    const button = document.getElementById('new-project-button')
    button.style.display = 'block'
}




export {renderIcon, toggleDarkMode, hideNewProjectButton}