

import { addDragAndDropListeners, downloadButton } from "../index.js";
import { hideLoader } from "../../utils/helpers.js";

import { createTodoElement } from "./createElements/createTodoElement.js";

export const container = document.getElementById('posts-container');
export const deleteCompletedButton = document.getElementById('delete-completed-button');

// Отрисовка задач на странице 
export function renderData(todos) {
  container.innerHTML = ''; //очищаем контейнер перед каждым вызовом функции

  //проверяем есть ли выполненая задача
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  deleteCompletedButton.style.display = hasCompletedTodos ? 'block' : 'none';

  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo, container);
    container.append(todoElement);
  }); 

  downloadButton.hidden = true; //скрываем кнопку получения задач после их рендера
  hideLoader(); //реализация 7 пункта
}