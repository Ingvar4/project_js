import { host } from '../host.js';
import { getUserInfo } from '../../src/utils/authHelper.js';

//3. Реализовать удаление из списка отдельной задачи (DELETE)
export async function deleteTodo(id) {
  try {
    const {uid, token} = await getUserInfo();

    const responce = await fetch(`${host}/${uid}/${id}.json?auth=${token}`, { method: 'DELETE' });
    
    if(!responce.ok) {
      throw new Error (`Не удалось удалить задачу. Статус: ${responce.status}`);
    }
    console.log('Задача удалена');
    return true;
  } catch (error) {
    console.error(`Ошибка удаления:`, error.message);
    throw error;
  }
}