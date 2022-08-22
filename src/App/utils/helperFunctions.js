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



export {createDomElement, renderIcon}