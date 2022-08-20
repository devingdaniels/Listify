
function createFooter(){
    const footer = document.createElement('footer')
    const container = document.createElement('p')
    container.classList.add('footer-container') 
    container.innerHTML = " Copyright ©"
    var date = new Date().getFullYear()
    container.innerHTML += " " + date + " "
    const link = document.createElement('a')
    link.href = "https://github.com/devingdaniels"
    link.target = "_blank"
    link.classList.add('gitLink')
    link.innerHTML = "devingdaniels"
    container.append(link)
    footer.append(container)
    return footer
}

export {createFooter}