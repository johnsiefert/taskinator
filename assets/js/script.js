let taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

let taskFormHandler = function(event){
   
     event.preventDefault();

let taskNameInput = document.querySelector("input[name='task-name']").value;
let taskTypeInput = document.querySelector("select[name='task-type']").value;
//package up data as an object
let taskDataObj ={
    name: taskNameInput,
    type: taskTypeInput
};
// check if input values are empty strings
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  formEl.reset();
//send it as an argument to createTaskEl
createTaskEl(taskDataObj);
}

let createTaskEl = function(taskDataObj) {
  // create list item
let listItemEl = document.createElement("li");
listItemEl.className = "task-item";

//add task id as a custom attribute
listItemEl.setAttribute("data-task-id", taskIdCounter);

// create div to hold task info and add to list item
let taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
// add HTML content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);

var taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);

tasksToDoEl.appendChild(listItemEl);
// add entire list item to list
tasksToDoEl.appendChild(listItemEl);

taskIdCounter++;

};

let createTaskActions = function(taskId) {
  let actionContainerEl = document.createElement("div");
 actionContainerEl.className = "task-actions";
 // create edit button
 let editButtonEl = document.createElement("button");
 editButtonEl.textContent = "Edit";
 editButtonEl.className = "btn edit-btn";
 editButtonEl.setAttribute("data-task-id", taskId);
 
 actionContainerEl.appendChild(editButtonEl);
 
 // create delete button
 let deleteButtonEl = document.createElement("button");
 deleteButtonEl.textContent = "Delete";
 deleteButtonEl.className = "btn delete-btn";
 deleteButtonEl.setAttribute("data-task-id", taskId);
 
 actionContainerEl.appendChild(deleteButtonEl);

 let statusSelectEl = document.createElement("select");
 statusSelectEl.className = "select-status";
 statusSelectEl.setAttribute("name", "status-change");
 statusSelectEl.setAttribute("data-task-id", taskId);

 actionContainerEl.appendChild(statusSelectEl);
 
 let statusChoices = ["To Do", "In Progress", "Completed"];

 for (let i = 0; i < statusChoices.length; i++) {
  // create option element
  let statusOptionEl = document.createElement("option");
  statusOptionEl.textContent = statusChoices[i];
  statusOptionEl.setAttribute("value", statusChoices[i]);

  // append to select
  statusSelectEl.appendChild(statusOptionEl);
}


 return actionContainerEl;
};

let taskButtonHandler = function(event) {
  // get target element from event
  let targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

let taskStatusChangeHandler = function(event) {
  console.log(event.target.value);

  // find task list item based on event.target's data-task-id attribute
  let taskId = event.target.getAttribute("data-task-id");

  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // convert value to lower case
  let statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};

let editTask = function(taskId) {
// get task list item element
let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// get content from task name and type
let taskName = taskSelected.querySelector("h3.task-name").textContent;
let taskType = taskSelected.querySelector("span.task-type").textContent;
document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent = "Save Task";
formEl.setAttribute("data-task-id", taskId);

};

let deleteTask = function(taskId) {
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};


// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);