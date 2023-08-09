import './style.css';

const button = document.querySelector('button');
const input = document.querySelector('input');
//

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
    const todo = input.value;
    // create li

    let li = document.createElement('li');
    // set textContent
    if (input.value.trim() == '') {
      return
    }
    li.textContent = todo.trim();

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
      let deleteTodoConfirmed = confirm('todo removed successfully !');
      if (deleteTodoConfirmed) {
        event.target.parentElement.parentElement.remove();
      }
      // alert latter
    };

    let span = document.createElement('span');
    span.append(deleteButton);
    li.append(span);
    // append li to ul
    ul.append(li);

    // clear input
    input.value = '';
}
