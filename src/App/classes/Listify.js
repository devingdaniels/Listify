/* eslint-disable max-len */
import { createNewProjectTabSection } from '../utils/createProjectTab';
import {
  createNewTaskButton,
  getCurrentDate,
  addSevenDays,
  createTaskFormAnchor,
} from '../utils/helperFunctions';

// Helper functions for Project class
function clearCurrentViewWrapper() {
  document.getElementById('current-view-wrapper').innerHTML = '';
}

function getCurrentViewWrapper() {
  return document.getElementById('current-view-wrapper');
}

function createCurrentViewHeading(title) {
  const heading = document.createElement('h1');
  heading.innerHTML = title;
  heading.classList.add('currentViewHeadingWrapper');
  return heading;
}

function viewIsEmptyMessage(message) {
  const el = document.createElement('h2');
  el.style.textAlign = 'center';
  el.innerHTML = message;
  return el;
}

export default class Listify {
  constructor() {
    this.projectArray = [];
  }

  displayAllTasks() {
    // Clear the previous content in the display section
    clearCurrentViewWrapper();
    // Display name of current view
    getCurrentViewWrapper().append(createCurrentViewHeading('All Tasks'));

    if (this.projectArray.length === 0) {
      getCurrentViewWrapper().append(viewIsEmptyMessage('Empty Inbox! :)'));
    } else {
      this.projectArray.forEach((project) => {
        project.taskArray.forEach((task) => {
          const el = task.displayPrettyTask(
            task.taskTitle,
            task.taskDescription,
            task.dueDate,
            project.projectTitle,
            task.isFavorite,
            task.isComplete,
          );
          getCurrentViewWrapper().append(el);
        });
      });
    }
  }

  displayToday() {
    // Clear the previous content in the display section
    clearCurrentViewWrapper();
    getCurrentViewWrapper().append(createCurrentViewHeading('Today'));

    if (!this.isTaskDueTodayInProjectArray()) {
      getCurrentViewWrapper().append(
        viewIsEmptyMessage('Nothing due today! :)'),
      );
    } else {
      this.projectArray.forEach((project) => {
        project.taskArray.forEach((task) => {
          if (task.dueDate === getCurrentDate()) {
            const el = task.displayPrettyTask(
              task.taskTitle,
              task.taskDescription,
              task.dueDate,
              project.projectTitle,
              task.isFavorite,
              task.isComplete,
            );
            getCurrentViewWrapper().append(el);
          }
        });
      });
    }
  }

  displayNextSevenDays() {
    // Clear the previous content in the display section
    clearCurrentViewWrapper();
    // Display name of current view
    getCurrentViewWrapper().append(createCurrentViewHeading('Next 7 Days'));

    if (!this.isDueNext7Days()) {
      getCurrentViewWrapper().append(
        viewIsEmptyMessage('Nothing due next 7 days! :)'),
      );
    } else {
      this.projectArray.forEach((project) => {
        project.taskArray.forEach((task) => {
          if (
            task.dueDate < addSevenDays(getCurrentDate())
            && task.dueDate !== 'No Date'
          ) {
            const el = task.displayPrettyTask(
              task.taskTitle,
              task.taskDescription,
              task.dueDate,
              project.projectTitle,
              task.isFavorite,
              task.isComplete,
            );
            getCurrentViewWrapper().append(el);
          }
        });
      });
    }
  }

  displayFavorites() {
    // Clear the previous content in the display section
    clearCurrentViewWrapper();
    // Display name of current view
    getCurrentViewWrapper().append(createCurrentViewHeading('Favorites'));

    if (!this.isTaskFavorite()) {
      getCurrentViewWrapper().append(viewIsEmptyMessage('No Favs!'));
    } else {
      this.projectArray.forEach((project) => {
        project.taskArray.forEach((task) => {
          if (task.isFavorite === true) {
            const el = task.displayPrettyTask(
              task.taskTitle,
              task.taskDescription,
              task.dueDate,
              project.projectTitle,
              task.isFavorite,
              task.isComplete,
            );
            getCurrentViewWrapper().append(el);
          }
        });
      });
    }
  }

  displayCompleted() {
    // Clear the previous content in the display section
    clearCurrentViewWrapper();
    // Display name of current view
    getCurrentViewWrapper().append(createCurrentViewHeading('Completed'));

    if (!this.isTaskComplete()) {
      getCurrentViewWrapper().append(viewIsEmptyMessage('Get to work!'));
    } else {
      this.projectArray.forEach((project) => {
        project.taskArray.forEach((task) => {
          if (task.isComplete === true) {
            const el = task.displayPrettyTask(
              task.taskTitle,
              task.taskDescription,
              task.dueDate,
              project.projectTitle,
              task.isFavorite,
              task.isComplete,
            );
            getCurrentViewWrapper().append(el);
          }
        });
      });
    }
  }

  displayAllCurrentProjectsSidebar() {
    // Anchor for appending new project tabs
    const projectAnchor = document.getElementById(
      'new-project-container-anchor',
    );
    // Clear existing UI before appending
    projectAnchor.innerHTML = '';
    this.projectArray.forEach((project) => {
      projectAnchor.append(createNewProjectTabSection(project.projectTitle));
    });
  }

  isDuplicateTitle(title) {
    return this.projectArray.some((project) => project.projectTitle === title);
  }

  getCurrentProject(projectTitle) {
    // Get the title of the current project in the view
    return this.projectArray.find(
      (project) => project.projectTitle === projectTitle,
    );
  }

  displayCurrentProject(projectTitle) {
    // Clear the previous content in the display section
    clearCurrentViewWrapper();
    // Display name of current project
    getCurrentViewWrapper().append(createCurrentViewHeading(projectTitle));
    // Create and append a 'add new task' button under the heading
    getCurrentViewWrapper().append(createNewTaskButton());
    // Add an anchor for appending a new task form. This way, if there are many tasks, the form is at the top and user does not have to scroll
    getCurrentViewWrapper().append(createTaskFormAnchor());
    // Display the current project tasks under the 'add task' button
    this.displayCurrentProjectTasks(this.getCurrentProject(projectTitle));
  }

  displayCurrentProjectTasks(project) {
    // For each task
    // Get task info, append to task display container
    // Append each container to the project section
    if (project.taskArray.length === 0) {
      getCurrentViewWrapper().append(viewIsEmptyMessage('No tasks'));
    } else {
      project.taskArray.forEach((task) => {
        // Use data to create task display container within the current project
        const el = task.displayPrettyTask(
          task.taskTitle,
          task.taskDescription,
          task.dueDate,
          project.projectTitle,
          task.isFavorite,
          task.isComplete,
        );
        // Append the task container to the dom in the project section
        getCurrentViewWrapper().append(el);
      });
    }
  }

  isTaskDueTodayInProjectArray() {
    for (let i = 0; i < this.projectArray.length; i += 1) {
      const project = this.projectArray[i];
      for (let j = 0; j < project.taskArray.length; j += 1) {
        if (project.taskArray[j].dueDate === getCurrentDate()) {
          return true;
        }
      }
    }
    return false;
  }

  isTaskFavorite() {
    for (let i = 0; i < this.projectArray.length; i += 1) {
      const project = this.projectArray[i];
      for (let j = 0; j < project.taskArray.length; j += 1) {
        if (project.taskArray[j].isFavorite === true) {
          return true;
        }
      }
    }
    return false;
  }

  isTaskComplete() {
    for (let i = 0; i < this.projectArray.length; i += 1) {
      const project = this.projectArray[i];
      for (let j = 0; j < project.taskArray.length; j += 1) {
        if (project.taskArray[j].isComplete === true) {
          return true;
        }
      }
    }
    return false;
  }

  isDueNext7Days() {
    for (let i = 0; i < this.projectArray.length; i += 1) {
      const project = this.projectArray[i];
      for (let j = 0; j < project.taskArray.length; j += 1) {
        if (project.taskArray[j].dueDate < addSevenDays(getCurrentDate())) {
          return true;
        }
      }
    }
    return false;
  }
}
