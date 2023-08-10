import './style.css';

function mk(type, props, children) {
  const el = document.createElement(type);
  if (props) Object.assign(el, props);
  if (children) el.append(...children);
  return el;
}

function app() {
  // declare ui elements
  let ui = {};
  // declare state
  let state = {id: 0, todos: []};

  let formChildren = [
    mk('form', null, [
      (ui.input = mk('input', { type: 'text', placeholder: 'Enter ToDo' })),
      (ui.add = mk('button', { onclick: add }, ['Add ToDo'])),
    ]),
  ]
  let children = [
    mk('h1', { className: 'title' }, ['Todo App']),
    mk('form', null, formChildren),
    (ui.todos = mk('ul', { className: 'todos', style: 'padding: 5px' }))
  ];

  let app = mk('div', { className: 'app', id: 'app' });
  app.append(...children);

  // setup event handlers
  function createTodo(todo) {
    let item, text, x;
    function remove() {
      state.todos = state.todos.filter((t) => t.id !== todo.id);
      item.remove();
      // console.log(ui, state);
    }
    // console.log(ui, state);

    function edit() {
      function onkeydown(e) {
        switch (e.keyCode) {
          case 13:
            text.textContent = todo.text = editing.value;
          case 27:
            editing.blur(); // eslint-disable-line no-fallthrough
        }
      }

      const cancel = () => (x.disabled = editing.replaceWith(text));

      let editing = mk('input', {
        style: 'flex:1;',
        onkeydown,
        value: todo.text,
        onblur: cancel,
      });

      text.replaceWith(editing);
      editing.focus();
      x.disabled = true;
    }

    item = mk('li', { style: 'display:flex;' }, [
      (text = mk('span', { style: 'flex:1;', ondblclick: edit }, [todo.text])),
      (x = mk('button', { onclick: remove }, ['X'])),
    ]);

    return item;
  }

  function add(e) {
    e.preventDefault();

    const text = ui.input.value;

    if (!text) return;

    ui.input.value = '';
    const todo = { id: ++state.id, text, completed: false };
    state.todos.push(todo);

    ui.todos.append(createTodo(todo));
  }

  return app;
}

document.body.append(app());

function testTodoApp(root) {
  // convert the current children to array and find the element with the id
  const app = [].find.call(root.children, (c) => c.id === 'app');
  console.log(app);
  let form = app.querySelector('form');
  const input = app.querySelector('input');
  console.log(input);
  const add = app.querySelector('button');
  console.log(add);

  for (let i = 1; i <= 500; i++) {
    input.value = `Item ${i}`;
    input.dispatchEvent(new Event('change'));
    add.dispatchEvent(new Event('click'));
  }

  const kids = [].slice.call(form.nextElementSibling.children);
  console.log(kids)

  for (let i = 0; i < kids.length; i++) {
    kids[i].firstElementChild.dispatchEvent(new Event('dblclick'));
    kids[i].firstElementChild.value += ' (updated)';
    kids[i].firstElementChild.dispatchEvent(
      Object.assign(new Event('keydown'), { keyCode: 13 })
    );
    if (!/updated/.test(kids[i].firstElementChild.textContent)) {
      throw Error('Expected todo item to have updated text');
    }
  }

  for (let i = kids.length / 2; i < kids.length; i++) {
    // console.log(kids[i].lastElementChild);
    kids[i]?.lastElementChild.dispatchEvent(new Event('click'));
  }

  for (let i = kids.length / 2; i--; ) {
    // console.log(kids[i]);
    kids[i]?.lastElementChild.dispatchEvent(new Event('click'));
  }
}

let time;

document.body.append(
  mk(
    'div',
    { style: 'position:fixed;left:0;bottom:0;background:#eee;padding:10px;' },
    [
      mk(
        'button',
        {
          onclick() {
            const start = performance.now();
            testTodoApp(document.body);
            const end = performance.now();
            time.textContent = `${end - start}ms`;
          },
        },
        ['Run Test']
      ),
      (time = mk('time', null, ['<ready>'])),
    ]
  )
);