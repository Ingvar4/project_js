import { createCheckbox } from "./createCheckbox.js";
import { createText } from "./createText.js";
import { createTime } from "./createTime.js";
import { createUpdateButton } from "./createUpdateButton.js";
import { createDeleteButton } from "./createDeleteButton.js";
import { addDragAndDropListeners } from "../../index.js";

export function createTodoElement(todo, container) {
  const todoElement = document.createElement('div');
  todoElement.classList.add('todo'); //добавляем заготовленные стили для каждой задачи
  todoElement.setAttribute('data-id', todo.id); //задаём каждому todo элементу data атрибут
  
  const checkbox = createCheckbox(todo);
  const updateButton = createUpdateButton(todo);
  const textElement = createText(todo, updateButton);
  const timeElement = createTime(todo);
  const deleteButton = createDeleteButton(todo);
 
  //пробрасываем всё это в todo элемент
  todoElement.append(checkbox, textElement, timeElement, deleteButton);
  addDragAndDropListeners(todoElement, todo, container);
  return todoElement;
}