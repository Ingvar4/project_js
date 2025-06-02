import { showError } from "../../utils/helpers.js";
import { addTodo } from "../../../API/index.js";
import { loadData } from "../index.js";
//5. Реализовать добавление новой задачи (CREATE)
export async function addNewTodo(taskInput) {
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
    console.error(error.message);
    showError('Не удалось добавить задачу');
  }
}