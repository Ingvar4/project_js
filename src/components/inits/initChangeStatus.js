import { toogleTodoStatus } from "../../../API/index.js";
import { loadData } from "../index.js";
import { showError } from "../../utils/notification.js";

export function initChangeStatus(todo, checkbox) {
  //для реализации 4 задачи на изменение статуса
  checkbox.addEventListener('change', async () => {
    try {
      await toogleTodoStatus(todo.id, checkbox.checked);
      await loadData();
    } catch (error) {
      console.error(error.message);
      showError('Не удалось изменить статус задачи');
    }
  });
}