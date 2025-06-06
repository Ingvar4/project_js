import { host } from '../host.js';
import { getUserInfo } from '../../src/utils/authHelper.js';
//6. Реализовать обновление текста существующей задачи (UPDATE)
export async function updateTodo(id, newText) {
  try {
    const {uid, token} = await getUserInfo();

    const responce = await fetch(`${host}/${uid}/${id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({text: newText}),
    });

    if(!responce.ok) {
      throw new Error (`Не удалось обновить задачу. Статус: ${responce.status}`);
    }

    console.log('Текст задачи обновлён');
    return true;
  } catch (error) {
    console.error(`Ошибка обновления текста задачи:`, error.message);
    throw error;
  }
}