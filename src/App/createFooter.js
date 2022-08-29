function createFooter(){
    // Get and save the footer wrapper
    const footerWrapper = document.getElementById('footer-wrapper')
    // Create the footer content and add classes
    const footer = document.createElement('footer')
    const container = document.createElement('p')
    container.classList.add('footerContainer') 
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
    // Append new content to the wrapper
    footerWrapper.append(footer)
}

export {createFooter}