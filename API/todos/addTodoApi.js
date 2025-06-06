import { host } from '../host.js';
import { getUserInfo } from '../../src/utils/authHelper.js';
//5. Реализовать добавление новой задачи (CREATE)
export async function addTodo(newTodo) {
  try {
    const {uid, token} = await getUserInfo();

    const responce = await fetch(`${host}/${uid}.json?auth=${token}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(newTodo),
    });

    if(!responce.ok) {
      throw new Error (`Не удалось добавить задачу. Статус: ${responce.status}`);
    }
    
    console.log('Задача добавлена');
    return true;
  } catch (error) {
    console.error(`Ошибка добавления:`, error.message);
    throw error;
  }
}