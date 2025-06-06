//4. Реализовать изменение статуса задачи (PUT)
//параметры будут приходить из функции где отрендерились все задачи
import { host } from '../host.js';
import { getUserInfo } from '../../src/utils/authHelper.js';

export async function toogleTodoStatus(id, completed) {
  try {
    const {uid, token} = await getUserInfo();

    //дополнительно понадобятся заголовки и тело
    const responce = await fetch(`${host}/${uid}/${id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json?auth=${token}',},
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