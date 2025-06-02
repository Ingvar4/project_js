import { updateTask } from "../../index.js";

export function createUpdateButton(todo) {
  // Кнопка обновления текста задачи
  const updateButton = document.createElement('button');
  updateButton.classList.add('button-function');
  
  const updateIcon = document.createElement('img');
  updateIcon.src = '../images/icon-update.png';
  updateIcon.alt = 'Изменить';
  updateIcon.title = 'Изменить';
  updateIcon.width = 24;

  updateButton.append(updateIcon);
  
  updateButton.addEventListener('click', () => updateTask(todo));

  return updateButton;
}
