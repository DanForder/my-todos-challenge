const form = document.querySelector("#form");
const todoInput = document.querySelector("#todo-input");
const allTodoItems = document.querySelector("#all-todo-items");

const todoList = ["adopt an owl"];
const emptyStateHTML =
  "<p>Either you've done everything already or there are still things to add to your list. Add a todo above!</p>";

const onFormSubmit = (event) => {
  // prevent reload of page
  event.preventDefault();

  // check input passes validation
  const newTodo = todoInput.value.trim();
  if (!newTodo || newTodo.length < 1) {
    return alert("please enter a todo");
  }

  // add new item to the todo list
  todoList.push(newTodo);

  // reload todos on the page
  recreateHTML();

  // reset all form fields
  event.target.reset();
};

const recreateHTML = () => {
  if (todoList.length < 1) {
    allTodoItems.innerHTML = emptyStateHTML;
    return;
  }

  const listItemsHTML = todoList
    .map((item, index) => {
      return `
      <li class="list__item">
        <input class="list__input" type="checkbox" id="todo-${index}" />
        <label class="list__label" for="todo-${index}">${item}</label>
      </li>
      `;
    })
    .join("");
  allTodoItems.innerHTML = `<ul class="list">${listItemsHTML}</ul>`;
};

const clearInput = () => {
  todoInput.value = null;
};

form.addEventListener("submit", onFormSubmit);

//initial logic
recreateHTML();
