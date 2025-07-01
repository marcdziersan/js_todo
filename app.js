const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const save = () => localStorage.setItem('todos', JSON.stringify(todos));

const render = () => {
  list.innerHTML = '';
  todos.forEach((text, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span contenteditable="true" onblur="update(${i}, this.textContent)">${text}</span>
      <button onclick="remove(${i})">🗑️</button>
    `;
    list.appendChild(li);
  });
};

const add = text => {
  todos.push(text);
  save();
  render();
};

const remove = index => {
  todos.splice(index, 1);
  save();
  render();
};

const update = (index, text) => {
  todos[index] = text.trim();
  save();
};

form.onsubmit = e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    add(text);
    input.value = '';
  }
};

render();
