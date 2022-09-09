// Images
import add from 'date-fns/add';
import format from 'date-fns/format';
import PlusIcon from '../assets/plus-icon.svg';
import {
  displayNewProjectForm,
  displayNewTaskForm,
  toggleDarkMode,
  updateViewTab,
} from '../eventListeners';
// Date methods

// Date methods
function getCurrentDate() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  today = `${mm}-${dd}-${yyyy}`;
  return today;
}

function formatJSDate(date) {
  if (date === '' || date === null) {
    return;
  }
  const string = String(date);
  date = '';

  for (let i = 5; i < 10; i++) {
    date += string[i];
  }
  date += '-';
  for (let i = 0; i < 4; i++) {
    date += string[i];
  }
  return date;
}

function addSevenDays(unParsedDate) {
  const plusSeven = add(new Date(unParsedDate), {
    weeks: 1,
  });
  const result = format(new Date(plusSeven), 'MM-dd-yyyy');
  return result;
}

// Icon and button components
function renderIcon(image, alt, styleClass) {
  if (image === '' || image === null) {
    return;
  }
  const img = new Image();
  img.src = image;
  img.alt = alt;
  if (styleClass !== '' && styleClass !== null) {
    img.classList.add(`${styleClass}`);
  }
  return img;
}

function createSidebarViewTab(image, alt, tabName, styleClass) {
  // Create the sidebarItem wrapper
  const tabItemContainer = document.createElement('div');
  // Append the image
  tabItemContainer.append(renderIcon(image, alt, styleClass));
  // Append the tabName
  const title = document.createElement('h4');
  title.innerHTML = tabName;
  tabItemContainer.append(title);
  if (image !== PlusIcon) {
    tabItemContainer.addEventListener('click', () => {
      if (!tabItemContainer.classList.contains('active')) {
        updateViewTab(tabItemContainer);
      }
    });
    tabItemContainer.classList.add('tabItemContainer');
  }
  return tabItemContainer;
}

function createNewProjectButton() {
  const anchor = document.getElementById('project-button-anchor');
  const button = createSidebarViewTab(
    PlusIcon,
    'Icon of a plus icon',
    'New Project',
    'sidebarTabViewIcon',
  );
  button.id = 'new-project-button';
  button.classList.add('newProjectButton');
  button.addEventListener('click', displayNewProjectForm);
  anchor.append(button);
}

function createNewTaskButton() {
  const button = createSidebarViewTab(
    PlusIcon,
    'Icon of a plus icon',
    'Add Task',
    'sidebarTabViewIcon',
  );
  button.id = 'new-task-button';
  button.classList.add('newTaskButton');
  button.addEventListener('click', displayNewTaskForm);
  return button;
}

function createTaskFormAnchor() {
  const anchor = document.createElement('div');
  anchor.id = 'new-task-form-anchor';
  return anchor;
}

// Disabler and enablers
function disableNewProjectButton() {
  const button = document.getElementById('new-project-button');
  button.style.pointerEvents = 'none';
}

function enableNewProjectButton() {
  const button = document.getElementById('new-project-button');
  button.style.pointerEvents = 'auto';
}

function disableNewTaskButton() {
  const button = document.getElementById('new-task-button');
  if (button !== '' && button !== null) {
    button.style.pointerEvents = 'none';
  }
}

function enableNewTaskButton() {
  const button = document.getElementById('new-task-button');
  if (button !== '' && button !== null) {
    button.style.pointerEvents = 'auto';
  }
}

function disableProjectSideBarItemDuringEdit(currentTab) {
  const items = document.querySelectorAll('.projectSidebarItemWrapper');
  items.forEach((el) => {
    if (el !== currentTab) {
      el.classList.add('disablePointerEvents');
    }
  });
}

function enableProjectSideBarItemDuringEdit() {
  const items = document.querySelectorAll('.projectSidebarItemWrapper');
  items.forEach((el) => {
    el.classList.remove('disablePointerEvents');
  });
}

function disableEditCurrentProjectButton(button) {
  button.classList.add('disablePointerEvents');
}

function enableEditCurrentProjectButton(button) {
  button.classList.remove('disablePointerEvents');
}

function disableTasksWhileEditing() {
  const tasks = document.querySelectorAll('.prettyTaskContainer');
  tasks.forEach((task) => {
    task.classList.add('disablePointerEvents');
  });
}

function enableTasksWhileEditing() {
  const tasks = document.querySelectorAll('.prettyTaskContainer');
  tasks.forEach((task) => {
    task.classList.remove('disablePointerEvents');
  });
}

function disableSideBarDuringTaskEditing() {
  const sidebarTabs = document.querySelectorAll('.tabItemContainer');
  const projectTabs = document.querySelectorAll('.projectSidebarItemWrapper');

  sidebarTabs.forEach((item) => {
    item.classList.add('disablePointerEvents');
  });

  projectTabs.forEach((item) => {
    item.classList.add('disablePointerEvents');
  });
}

function enableSideBarDuringTaskEditing() {
  const sidebarTabs = document.querySelectorAll('.tabItemContainer');
  const projectTabs = document.querySelectorAll('.projectSidebarItemWrapper');

  sidebarTabs.forEach((item) => {
    item.classList.remove('disablePointerEvents');
  });

  projectTabs.forEach((item) => {
    item.classList.remove('disablePointerEvents');
  });
}

function removeProjectForm() {
  const clearForm = document.getElementById('project-form-container-anchor');
  clearForm.innerHTML = '';
}

function showErrorMessage(targetElement, message) {
  const errorMessage = document.getElementById(targetElement);
  errorMessage.classList.add('errorMessage');
  errorMessage.value = '';
  errorMessage.placeholder = message;
}

function getCurrentActiveViewTab() {
  // Get all the current tabs on the sidebar
  const allTabItems = document.querySelectorAll('.tabItemContainer');
  // Make all tabs except current tab inactive
  const array = Array.from(allTabItems);
  return array.find((el) => el.classList.contains('active'));
}

function doesTaskFormHaveName() {
  const title = document.getElementById('task-title').value;
  if (title !== '') {
    return true;
  }
  return false;
}

function createDarkModeButton() {
  // Button wrapper
  const darkModeWrapper = document.createElement('div');
  darkModeWrapper.classList.add('darkModeWrapper');
  // Light button
  const lightRadio = document.createElement('input');
  lightRadio.type = 'radio';
  lightRadio.id = 'lightModeButton';
  lightRadio.name = 'colorTheme';
  lightRadio.value = 'light';
  lightRadio.checked = 'true';
  lightRadio.addEventListener('click', toggleDarkMode);
  const lightLabel = document.createElement('label');
  lightLabel.for = 'light';
  lightLabel.innerHTML = 'Light';
  // Dark button
  const darkRadio = document.createElement('input');
  darkRadio.type = 'radio';
  darkRadio.id = 'darkModeButton';
  darkRadio.name = 'colorTheme';
  darkRadio.value = 'dark';
  darkRadio.addEventListener('click', toggleDarkMode);
  const darkLabel = document.createElement('label');
  darkLabel.for = 'dark';
  darkLabel.innerHTML = 'Dark';
  // Appends
  darkModeWrapper.append(lightRadio);
  darkModeWrapper.append(lightLabel);
  darkModeWrapper.append(darkRadio);
  darkModeWrapper.append(darkLabel);
  return darkModeWrapper;
}

export {
  renderIcon,
  createNewProjectButton,
  createSidebarViewTab,
  disableNewProjectButton,
  enableNewProjectButton,
  removeProjectForm,
  createNewTaskButton,
  showErrorMessage,
  enableNewTaskButton,
  disableNewTaskButton,
  formatJSDate,
  getCurrentActiveViewTab,
  getCurrentDate,
  addSevenDays,
  disableProjectSideBarItemDuringEdit,
  enableProjectSideBarItemDuringEdit,
  enableEditCurrentProjectButton,
  disableEditCurrentProjectButton,
  doesTaskFormHaveName,
  disableTasksWhileEditing,
  enableTasksWhileEditing,
  disableSideBarDuringTaskEditing,
  enableSideBarDuringTaskEditing,
  createDarkModeButton,
  createTaskFormAnchor,
};
