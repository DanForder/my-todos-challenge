// html element variables
const taskInput = document.getElementById("task-input");
const resetButton = document.getElementById("reset-button");
const taskList = document.getElementById("task-list");
const completeTaskText = document.getElementById("complete-task-text");
const addTask = document.getElementById("add-task");

// data
const tasks = [
  "Do the weekly grocery shop",
  "Go to the gym",
  "Be in bed by 22.30",
  "Get my haircut",
];

// functions
const handleAddTask = () => {
  const input = taskInput.value.trim();

  if (isDuplicateTask(input) || input.length < 1) {
    console.log("error adding new task");
    return;
  }

  tasks.push(input);
  generateTaskList();
};

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

//event listeners
addTask.addEventListener("click", handleAddTask);

//initial logic
generateTaskList();
