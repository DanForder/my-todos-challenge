// html element variables
const taskInput = document.getElementById("task-input");
const resetButton = document.getElementById("reset-button");
const taskList = document.getElementById("task-list");
const completeTaskText = document.getElementById("complete-task-text");
const addTask = document.getElementById("add-task");
const footer = document.getElementById("footer");

// data
const tasks = [
  "Do the weekly grocery shop",
  "Go to the gym",
  "Be in bed by 22.30",
  //   "Get my haircut",
];

const updateHtml = () => {
  generateTaskList();
  //TODO: show/hide footer
};

// functions
const isDuplicateTask = (task) => {
  return tasks.indexOf(task) !== -1;
};

const generateTaskList = () => {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    taskList.innerHTML += `
  	<li class="tasks__item">
  		<input id="task-item-${index}" class="tasks__checkbox" type="checkbox" value="${task.complete}"/>
  		<span class="tasks__check"></span>
  		<label for="task-item-${index}" class="tasks__item-label">${task}</label>
  		<i class="tasks__edit-icon fas fa-pen"></i>
  	</li>`;
  });

  setTasksCompleteText(tasks.length);
};

const setTasksCompleteText = (numberOfTasks) => {
  completeTaskText.innerHTML =
    tasks.length === 0
      ? "All tasks have been completed. Great job!"
      : `Tasks to complete: ${numberOfTasks}`;
};

const handleAddTask = () => {
  const input = taskInput.value.trim();

  if (isDuplicateTask(input) || input.length < 1) {
    console.log("error adding new task");
    return;
  }

  tasks.push(input);
  taskInput.value = "";
  updateHtml();
};

const handleInputEnterKeyup = (event) => {
  if (event.key === "Enter") {
    handleAddTask();
  }
};

const handleReset = () => {
  tasks.length = [];
  updateHtml();
};

//event listeners
addTask.addEventListener("click", handleAddTask);
taskInput.addEventListener("keyup", handleInputEnterKeyup);
resetButton.addEventListener("click", handleReset);

//initial logic
updateHtml();
