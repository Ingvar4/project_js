import { updateTaskOrderOnServer } from "../../../API/index.js";
import { showLoader, hideLoader } from "../../utils/helpers.js";
import { showError } from "../../utils/notification.js";
//функция обновления данных на сервере после перетаскивания
export async function updateTasksOrder (container) {
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
    showError('Не удалось переместить предмет');
  } finally {
    hideLoader();
  }
}