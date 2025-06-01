import { getTodos } from '../API/getTodoApi.js';
import { toogleTodoStatus } from '../API/getStatusTodoApi.js';
import { deleteTodo } from '../API/deleteTodoApi.js';
import { updateTodo } from '../API/updateTodoApi.js';
import { addTodo } from '../API/addTodoApi.js';
import { updateTaskOrderOnServer } from '../API/updateTasksOrderApi.js';
import { deleteCompletedTodos } from '../API/deleteCompletedTodosApi.js';

const container = document.getElementById('posts-container');
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const downloadButton = document.querySelector('.button-download');
const overlay = document.getElementById('overlay');
const deleteCompletedButton = document.getElementById('delete-completed-button');
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

  //проверяем есть ли выполненая задача
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  deleteCompletedButton.style.display = hasCompletedTodos ? 'block' : 'none';

  todos.forEach((todo) => {
    const todoElement = document.createElement('div');
    todoElement.classList.add('todo'); //добавляем заготовленные стили для каждой задачи
    todoElement.setAttribute('data-id', todo.id); //задаём каждому todo элементу data атрибут
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
    addDragAndDropListeners(todoElement, todo);
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

downloadButton.addEventListener('click', loadData);

//Реализация удаления выполненных задач
deleteCompletedButton.addEventListener('click', async () => {
  const isConfirmed = confirm('Вы уверены? Все выполненные задачи будут удалены!');

  if (!isConfirmed) {
    return;
  }

  try {
    await deleteCompletedTodos(container);
    await loadData();
  } catch (error) {
    console.error(error.message);
  }
});

//7. overlay, спиннер
function showLoader() {
  overlay.style.display = 'flex';
}

function hideLoader() {
  overlay.style.display = 'none';
}


//Функция перетаскивания элементов
function addDragAndDropListeners(todoElement, todo) {
  todoElement.draggable = true;
  todoElement.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', todo.id);
    event.currentTarget.classList.add('dragging');
  });

  todoElement.addEventListener('dragover', (event) => {
    event.preventDefault();
    const draggable = document.querySelector('.dragging');
    const overElement = event.currentTarget;

    if (overElement !== draggable) {
      const rect = overElement.getBoundingClientRect();
      const offset = event.clientY - rect.top;
      if (offset < rect.height / 2) {
        container.insertBefore(draggable, overElement);
      } else {
        container.insertBefore(draggable, overElement.nextSibling);
      }
    }
  });
  //снятие стилей после перетаскивания
  todoElement.addEventListener('dragend', (event) => {
    event.currentTarget.classList.remove('dragging');

    updateTaskOrder();
  });
}

//функция обновления данных на сервере после перетаскивания
async function updateTaskOrder () {
  const todos = [...container.querySelectorAll('.todo')]; // превращаем получ. данные в массив
  const updatedOrder = todos.map((todo, index) => {
    return {
      id: todo.getAttribute('data-id'),
      order: index + 1,
    };
  });
  
  try {
    showLoader();
    for (const task of updatedOrder) {
      await updateTaskOrderOnServer(task.id, task.order);
    }
    
    console.log('Порядок задач обновлён');
    return true;
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
  }
}
