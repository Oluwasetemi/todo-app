import './style.css';

const button = document.querySelector('button');
const input = document.querySelector('input');

//  An empty array to hold all the todo created
const todos = [];

button.addEventListener('click', createTodo);

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    // create todo only if input is not empty
    createTodo();
  }
});

function createTodo(event) {
  let input = button.previousElementSibling;
  let divTodo = button.nextElementSibling;
  let ul = divTodo.firstElementChild;
  // console.log(ul);
  const todo = input.value.trim();
  // Add todo to the todos array
  todos.push(todo);

  // create li
  let li = document.createElement('li');
  // set textContent
  if (todo == '') {
    return;
  }

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
  deleteButton.onclick = handleDeleteTodo;
  // alert latter
  // toast

  let span = document.createElement('span');
  span.append(deleteButton);
  li.append(span);
  // append li to ul
  ul.append(li);

  // clear input
  input.value = '';

  // save todo to local storage
  localStorage.setItem('todo', [...todos, localStorage.getItem('todo') || '']);

  // const storage = localStorage.getItem("todo");
  // console.log(storage);
}

// load todo from local storage on window load
window.onload = () => {
  const storage = localStorage.getItem('todo');
  console.log(typeof storage);

  let ul = document.querySelector('ul');

  let todoLis = storage
    .split(',')
    .filter((todo) => todo !== '')
    .map((todo) => {
      // create a single todo
      let li = document.createElement('li');
      // set textContent
      li.textContent = todo;
      // add a delete button
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      // add onclick event to button
      deleteButton.onclick = handleDeleteTodo;

      let span = document.createElement('span');
      span.append(deleteButton);
      li.append(span);

      return li;
    });

  console.log(todoLis);
  ul.append(...todoLis);
};

const handleDeleteTodo = (event) => {
  // remove li
  let deleteTodoConfirmed = confirm('do you want to remove todo?!');
  if (deleteTodoConfirmed) {
    let thisDeleteButton = event.target;
    let span = thisDeleteButton.parentElement;
    let li = span.parentElement;

    // delete from local storage
    let todo = li.firstChild.textContent;
    // console.log(todo);
    let storage = localStorage.getItem('todo');
    // console.log(storage.split(','));

    let newStorage = storage
      .split(',')
      .filter((todo) => todo !== '')
      .filter((todoItem) => todoItem !== todo);

    // console.log(newStorage);

    localStorage.setItem('todo', newStorage);

    // remove li
    li.remove();
  }
};

// test the app created for performance
// 1. create 1000 todo
// 3. edit 1000 todo (update)
// 2. delete 1000 todo
// 4. mark 1000 todo as done
// 5. unmark 1000 todo as done
// 6. clear all todo

let testDiv = document.createElement('div');
testDiv.style = 'position: fixed; bottom: 0; left: 0; z-index: 1000;';
let testTodos = [];
let createTodoButton = document.createElement('button');
createTodoButton.textContent = 'Create 1000 todo';
let ul = document.createElement('ul');
let time = document.createElement('time')
time.textContent = '0ms';
testDiv.append(createTodoButton, time);




createTodoButton.onclick = () => {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    // test todo
    let todo = `todo ${i}`;
    // Add todo to the todos array
    testTodos.push(todo);
    // create li
    let li = document.createElement('li');
    // set textContent
    li.textContent = todo;
    // add a delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    // add onclick event to button
    deleteButton.onclick = handleDeleteTodo;

    let span = document.createElement('span');
    span.append(deleteButton);
    li.append(span);
    // append li to ul
    ul.append(li);
    li.dispatchEvent(new Event('click'));
    console.log(li)
  }
  const end = performance.now();
  time.textContent = `${end - start}ms`;
}

document.body.append(testDiv);