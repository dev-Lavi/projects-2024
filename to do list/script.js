
/* it is a var and its value can be changed*/
/* value of constant cant be changed */


/* Retrieve todo from local storage or intialize an empty array */
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

//intialize
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask,
            disabled: false
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const container = document.createElement("div");
    container.className = "todo-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.id = `input-${index}`;
    checkbox.checked = item.disabled;
    checkbox.addEventListener("change", () => toggleTask(index));

    const task = document.createElement("p");
    task.id = `todo-${index}`;
    task.className = item.disabled ? "disabled" : "";
    task.textContent = item.text;
    task.addEventListener("click", () => editTask(index));

    container.appendChild(checkbox);
    container.appendChild(task);
    todoList.appendChild(container);
  });
  todoCount.textContent = todo.length;
}


function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");
  
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();
  
    inputElement.addEventListener("blur", function () {
      const updatedText = inputElement.value.trim();
      if (updatedText) {
        todo[index].text = updatedText;
        saveToLocalStorage();
      }
      displayTasks();
    });
  }

  function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
  }
  
  function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
  }
  
  function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
  }