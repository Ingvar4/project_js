import { initDelete } from "../../index.js";

export function createDeleteButton(todo) {
  //создаём кнопку удаления внутри задачи с заготовленными стилями
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button-function');
  
  const deleteIcon = document.createElement('img'); //внутри кнопки иконка
  deleteIcon.src = '../images/icon-delete.png';
  deleteIcon.alt = 'Удалить';
  deleteIcon.title = 'Удалить';
  deleteIcon.width = 24;
  
  deleteButton.append(deleteIcon);
  
  initDelete(todo, deleteButton);

  return deleteButton;
}