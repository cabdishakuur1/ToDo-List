let taskInput = document.querySelector(".task-value");
let btnAddTask = document.querySelector(".add-task");
let tasksBox = document.querySelector(".tasks");
let btnRemoveAll = document.querySelector(".del-all");

// Empty Array To Store The Tasks List
let taskList = [];

// Check Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  taskList = JSON.parse(localStorage.getItem("tasks"));
}

// Add Tasks To Page
addTasksToView(taskList);

btnAddTask.onclick = function (event) {
  event.preventDefault();
  // Check value not empty
  if (taskInput.value !== "") {
    //
    addTaskToList(taskInput.value);
    taskInput.value = "";
  }
};

tasksBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    changeStatusWith(e.target.dataset.taskid);
    // Toggle Done Class
    e.target.classList.toggle("done");
  } else if (e.target.classList.contains("text")) {
    // Toggle Completed For The Task
    changeStatusWith(e.target.parentElement.dataset.taskid);
    // Toggle Done Class
    e.target.parentElement.classList.toggle("done");
  } else if (e.target.classList.contains("del")) {
    // Remove Task from localStorage
    removeTaskWith(e.target.parentElement.dataset.taskid);
    // Remove Task form Page
    e.target.parentElement.remove();
  }
});

// Remove All Tasks
btnRemoveAll.onclick = function () {
  tasksBox.innerHTML = "";
  taskList = [];
  localStorage.setItem("tasks", "");
};

/* Functions */

function addTaskToList(value) {
  const task = {
    taskId: Date.now(),
    title: value,
    completed: false,
  };
  taskList.push(task);
  addTasksToView(taskList); // Add Tasks To Page
  addTasklocalStorage(taskList); // Add Tasks to localStorage
}

function addTasksToView(list) {
  // Empty Tasks Div
  tasksBox.innerHTML = "";
  //Looping on tasks
  list.forEach(function (task) {
    // Create Task Div
    let div = document.createElement("div");
    // Add done class to Task by completed Attribute
    // Task completed  => add done class
    // Task not completed  => remove done class
    div.classList = `task${task.completed == true ? " done" : ""}`;
    div.setAttribute("data-taskid", task.taskId);

    // Create Text Div
    let text = document.createElement("div");
    text.className = "text";
    text.append(document.createTextNode(task.title));
    div.append(text); //add text to task div

    // Create Delete Button
    let btnDel = document.createElement("span");
    btnDel.className = "del";
    btnDel.append(document.createTextNode("Delete"));
    div.append(btnDel); // add delete Button

    // add Task To Tasks Container
    tasksBox.prepend(div);
  });
}

function addTasklocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function changeStatusWith(id) {
  taskList.map((task) => {
    if (task.taskId == id) {
      task.completed = !task.completed;
    }
  });
  addTasklocalStorage(taskList);
}

function removeTaskWith(id) {
  taskList = taskList.filter((task) => task.taskId != id);
  addTasklocalStorage(taskList);
}
