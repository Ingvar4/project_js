import { getTodos } from '../API/getTodoApi.js';
import { toogleTodoStatus } from '../API/getStatusTodoApi.js';
import { deleteTodo } from '../API/deleteTodoApi.js';
import { updateTodo } from '../API/updateTodoApi.js';
import { addTodo } from '../API/addTodoApi.js';

const container = document.getElementById('posts-container');
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const downloadButton = document.querySelector('.button-download');
const overlay = document.getElementById('overlay');
//создаём отдельную переменную для переиспользования URL API для работы с задачами
export const host = 'https://68382f1e2c55e01d184c4d9a.mockapi.io/api/v1/todos';
// Загрузка данных с сервера (READ)
async function loadData() {
  try {
    showLoader(); 
    const todos = await getTodos();
    renderData(todos); 
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
  }
}
// Отрисовка задач на странице 
function renderData(todos) {
  container.innerHTML = ''; //очищаем контейнер перед каждым вызовом функции
  todos.forEach((todo) => {
    const todoElement = document.createElement('div');
    todoElement.classList.add('todo'); //добавляем заготовленные стили для каждой задачи
    const checkbox = document.createElement('input'); //создаём чекбокс динамически и задаём ему тип + статус состояния
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    //для реализации 4 задачи на изменение статуса
    checkbox.addEventListener('change', async () => {
      try {
        await toogleTodoStatus(todo.id, checkbox.checked);
        await loadData();
      } catch (error) {
        console.error(error.message);
      }
    });
    const textElement = document.createElement('p'); //создаём элемент для текста задачи
    textElement.textContent = todo.text; //зачёркивать задачу при отметки о выполнении
    textElement.style.textDecoration = todo.completed ? 'line-through' : 'none';

    const timeElement = document.createElement('p'); //создаём элемент с датой и форматируем её
    timeElement.textContent = new Date(todo.createdAt).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    //создаём кнопку удаления внутри задачи с заготовленными стилями
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button-function');
    const deleteIcon = document.createElement('img'); //внутри кнопки иконка
    deleteIcon.src = '../images/icon-delete.png';
    deleteIcon.alt = 'Удалить';
    deleteIcon.title = 'Удалить';
    deleteButton.append(deleteIcon);
    //навешиваем обработчик на кнопку, вызываем функцию deleteTodo, куда пробрасываем id задач
    deleteButton.addEventListener("click", async () => {
      try {
        await deleteTodo(todo.id);
        await loadData();
      } catch (error) {
        console.error(error.message);
      }
    });

    // Кнопка обновления текста задачи
    const updateButton = document.createElement('button');
    updateButton.classList.add('button-function');
    const updateIcon = document.createElement('img');
    updateIcon.src = '../images/icon-update.png';
    updateIcon.alt = 'Изменить';
    updateIcon.title = 'Изменить';
    updateButton.append(updateIcon);
    //Добавляем для 6 пункта, обновление текста существующей задачи
    updateButton.addEventListener('click', async () => {
      const newText = prompt('Введите новый текст задачи', todo.text);
      if (newText) {
        try {
          await updateTodo(todo.id, newText);
          await loadData();
        } catch (error) {
          console.error(error.message);
        }
      }
    });

    //пробрасываем всё это в todo элемент
    todoElement.append(checkbox, textElement, timeElement, deleteButton, updateButton);
    container.append(todoElement);
    downloadButton.hidden = true; //скрываем кнопку получения задач после их рендера
    hideLoader(); //реализация 7 пункта
  }); 
}

//5. Реализовать добавление новой задачи (CREATE)
async function addNewTodo() {
  const newTodoText = taskInput.value.trim();
  if (!newTodoText) {
    alert('Введите текст задачи');
    return;
  }

  const newTodo = {
    text: newTodoText,
    createdAt: Date.now(),
    completed: false,
  };

  try {
    await addTodo(newTodo);
    
    console.log('Задача добавлена');
    taskInput.value = ''; // Очищаем поле ввода
    await loadData(); //получение данных, обновление списка задач
  } catch (error) {
    console.error(`Ошибка добавления:`, error.message);
  }
}
//1й способ добавления задачи
addButton.addEventListener('click', addNewTodo);
//2й способ
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addNewTodo();
  }
});

//7. overlay, спиннер
function showLoader() {
  overlay.style.display = 'flex';
}

function hideLoader() {
  overlay.style.display = 'none';
}

downloadButton.addEventListener('click', loadData);