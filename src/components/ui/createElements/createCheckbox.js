import { initChangeStatus } from "../../index.js";

export function createCheckbox(todo) {
  //создаём чекбокс динамически и задаём ему тип + статус состояния
  const checkbox = document.createElement('input'); 
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;

  initChangeStatus(todo, checkbox);

  return checkbox;
}
