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
