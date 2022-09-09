import {
  createSidebarViewTab,
  disableEditCurrentProjectButton,
  disableNewProjectButton,
} from "./helperFunctions";
import { editCurrentProject, deleteCurrentProject } from "../eventListeners";
import FolderIcon from "../assets/folder-icon.svg";
import { disableProjectSideBarItemDuringEdit } from "./helperFunctions";

function createNewProjectTabSection(projectTitle) {
  const projectSidebarItemWrapper = document.createElement("div");
  projectSidebarItemWrapper.classList.add("projectSidebarItemWrapper");
  const projectSidebarItem = createSidebarViewTab(
    FolderIcon,
    "Icon of a folder image",
    projectTitle,
    "sidebarTabViewIcon"
  );
  // Options button for editing project name or deleting project after creation
  const editProjectAnchor = document.createElement("div");
  editProjectAnchor.id = `${projectTitle}-edit-anchor`;

  const editDeleteWrapper = document.createElement("div");
  editDeleteWrapper.setAttribute("projectName", projectTitle);
  editDeleteWrapper.classList.add("editDeleteWrapper");
  const optionsButton = document.createElement("i");
  optionsButton.classList.add("fa-solid", "fa-pen-to-square");
  optionsButton.style.cursor = "pointer";
  optionsButton.id = `${projectTitle}-edit-project-title`;
  optionsButton.addEventListener("click", (e) => {
    // Disable the new task button until current task is updated or cancelled
    disableNewProjectButton();
    // Disable edit button so user can't create duplicate edit containers
    disableEditCurrentProjectButton(optionsButton);
    // Disable other project tabs so user can only edit one at a time
    const projectItemWrapper = e.target.parentElement.parentElement;
    disableProjectSideBarItemDuringEdit(projectItemWrapper);
    editCurrentProject(e);
  });
  const deleteButton = document.createElement("i");
  deleteButton.classList.add("fa-solid", "fa-trash");
  deleteButton.style.cursor = "pointer";
  deleteButton.addEventListener("click", (e) => {
    deleteCurrentProject(e);
  });

  editDeleteWrapper.append(optionsButton);
  editDeleteWrapper.append(deleteButton);

  // Append the project tab and project options icon to the wrapper
  projectSidebarItemWrapper.append(projectSidebarItem);
  projectSidebarItemWrapper.append(editProjectAnchor);
  projectSidebarItemWrapper.append(editDeleteWrapper);
  return projectSidebarItemWrapper;
}

export { createNewProjectTabSection };
