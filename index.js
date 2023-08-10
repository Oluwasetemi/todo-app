import './style.css';

const button = document.querySelector('button');
const input = document.querySelector('input');

button.addEventListener('click', createTodo);

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    // create todo only if input is not empty
    createTodo();
  }
});
// Get all the todos from the local storage
const storage = localStorage.getItem("todos");
console.log(storage);

// Create an onload event to load the todos from the storage
window.onload = (e) => {
  if (storage) {
    // Split the stored todos into the storageTodoArray variable
    const storageTodoArray = storage.split(",");
    // Create a forEach loop to loop through the storageTodoArray and create the todos to be displayed
    storageTodoArray.forEach((todo) => {
      // Call the createTodo function to create the todo from the stored todos
      createTodo(e, todo);
    });
  }
}

// Added a savedTodo parameter to the createTodo function and set it to null as default
function createTodo(event, savedTodo = null) {
  let input = button.previousElementSibling;
  let divTodo = button.nextElementSibling;
  let ul = divTodo.firstElementChild;
  // console.log(ul);

  // Create a variable to hold each todo
  let todo;

  // Check if the function is called from the onload event with a saved todo
  if (savedTodo) {
    // If there is a saved todo, use it
    todo = savedTodo;
    // else use the input value
  } else {
    // If there is no saved todo, use the input value
    todo = input.value.trim();
    console.log(todo);
    // check if the todo is empty
    if (todo == '') {
      // If the todo is empty, return from the function
      return;
    }

    // Get current todos from the local storage
    const storage = localStorage.getItem("todos");
    // Check if there are todos in the local storage    
    if (!storage) {
      // If there are no todos in the local storage, save the todo
      localStorage.setItem("todos", todo);
    }
    // If there are todos in the local storage, add the new todo to the existing todos
    else {
      localStorage.setItem("todos", [storage, todo]);
    }
    // Console log the saved todo
    console.log(localStorage.getItem("todos"));
  }

  // create li
  let li = document.createElement('li');
  // set textContent
  // if (todo == '') {
  //   return;
  // }

  li.textContent = todo;

  // single click on the line mean todo is done
  li.onclick = (event) => {
    event.target.classList.toggle('completed');
  };

  // double click on the line mean edit todo
  li.ondblclick = (event) => {
    // get the existing textContent of li
    let existingTodo = event.target.firstChild.textContent;
    // prompt user to enter new todo
    let newTodo = prompt('Enter new todo', existingTodo);
    // update li textContent
    event.target.firstChild.textContent = newTodo;
  }

  // add a delete button
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  // add onclick event to button
  deleteButton.onclick = (event) => {
    // remove li
    let deleteTodoConfirmed = confirm('do you want to remove todo?!');
    if (deleteTodoConfirmed) {
      let thisDeleteButton = event.target;
      let span = thisDeleteButton.parentElement;
      let li = span.parentElement;
      // remove li
      li.remove();
    }
    // alert latter
    // toast
  };

  let span = document.createElement('span');
  span.append(deleteButton);
  li.append(span);
  // append li to ul
  ul.append(li);

  // clear input
  input.value = '';

  localStorage.setItem("todo", todos);
  const storage = localStorage.getItem("todo");
  console.log(storage);
}
