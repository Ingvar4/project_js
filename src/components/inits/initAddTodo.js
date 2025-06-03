import { addNewTodo } from "../index.js";

export function initAddTodo() {
  const taskInput = document.getElementById('task-input');
  const addButton = document.getElementById('add-button');
  //1й способ добавления задачи
  addButton.addEventListener('click', () => addNewTodo(taskInput));
  //2й способ
  taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addNewTodo(taskInput);
    }
  });
}