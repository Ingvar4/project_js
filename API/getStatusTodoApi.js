//4. Реализовать изменение статуса задачи (PUT)
//параметры будут приходить из функции где отрендерились все задачи
import { host } from '../scripts/16other.js';

export async function toogleTodoStatus(id, completed) {
  try {
    //дополнительно понадобятся заголовки и тело
    const responce = await fetch(`${host}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({completed}),
    });
    if(!responce.ok) {
      throw new Error (`Не удалось обновить статус задачи. Статус: ${responce.status}`);
    }
    console.log('Статус задачи обновлён');
    return true;
  } catch (error) {
    console.error(`Ошибка обновления статуса задачи:`, error.message);
    throw error;
  }
}