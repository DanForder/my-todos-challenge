// initial HTML elements
const form = document.querySelector("#form");
const todoInput = document.querySelector("#todo-input");
const allTodoItems = document.querySelector("#all-todo-items");
const resetButton = document.querySelector("#reset-button");

// global variables
const todoList = [
  { content: "adopt an owl", checked: false },
  { content: "feed the ducks", checked: false },
  { content: "pet a doggo", checked: false },
  { content: "go to class", checked: false },
];
const emptyStateHTML =
  "<p>Nothing to see here yet... Add a task in the field above! ☝️</p>";

// clears all data, inputs, and form elements
const resetPage = () => {
  form.reset();
  todoList.length = 0;
  recreateHTML();
};

const onFormSubmit = (event) => {
  // prevent reload of page
  event.preventDefault();

  // check input passes validation
  const newTodo = todoInput.value.trim();
  if (!newTodo || newTodo.length < 1) {
    return alert("please enter a todo");
  }

  // add new item to the todo list
  todoList.push({ content: newTodo, checked: false });
  // reload todos on the page
  recreateHTML();
  // reset all form fields
  event.target.reset();
};

// maps all current task checkboxes to the corresponding task in the array
const mapTaskCheckboxes = () => {
  const todoCheckboxes = document.querySelectorAll(".list__input");
  todoCheckboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => checkTodo(index));
  });
};

// toggles the checked state of a task based on its index in the array
const checkTodo = (index) => {
  todoList[index].checked = !todoList[index].checked;
  recreateHTML();
};

// returns HTML for a list of inputs based on an array of tasks
const createListItemsHTML = (list) => {
  return list
    .map(({ checked, content }, index) => {
      return `<li class="list__item">
        <input class="list__input" type="checkbox" id="todo-${index}" ${
        checked && "checked"
      } />
        <label class="list__label" for="todo-${index}">${content}</label>
      </li>`;
    })
    .join("");
};

const recreateHTML = () => {
  // show empty state if there are no tasks to complete
  if (todoList.length < 1) {
    allTodoItems.innerHTML = emptyStateHTML;
    return;
  }

  // create the unordered list based on todo array
  const listItemsHTML = createListItemsHTML(todoList);
  allTodoItems.innerHTML = `<ul class="list">${listItemsHTML}</ul>`;

  // map to do checkboxes to the correct item in array
  mapTaskCheckboxes();
};

// event listeners
form.addEventListener("submit", onFormSubmit);
resetButton.addEventListener("click", resetPage);

//initial logic
recreateHTML();
