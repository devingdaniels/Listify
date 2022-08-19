import AccountIcon from '../assets/account-icon.svg'
import TrayFullIcon from '../assets/tray-full-icon.svg'
import TodayIcon from '../assets/tray-full-icon.svg'

function renderProfileIcon(){
    const accountIcon = new Image()
    accountIcon.src = AccountIcon
    accountIcon.alt = "Icon of profile image"
    accountIcon.classList.add('account-icon')
    return accountIcon
}

function renderTrayFullIcon(){
    const trayFullIcon = new Image()
    trayFullIcon.src = TrayFullIcon
    trayFullIcon.alt = "Icon of full inbox"
    trayFullIcon.classList.add('sidebar-icon')
    return trayFullIcon
}


function renderTodayIcon(){
    const todayIcon = new Image()
    todayIcon.src = TodayIcon
    todayIcon.alt = "Icon of calender highlighting today"
    todayIcon.classList.add('sidebar-icon')
    document.getElementById('today-icon').append(todayIcon)
    return 
}

export {renderProfileIcon, renderTrayFullIcon, renderTodayIcon}