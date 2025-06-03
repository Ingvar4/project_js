import { host } from '../host.js';
//3. Реализовать удаление из списка отдельной задачи (DELETE)
export async function deleteTodo(id) {
  try {
    const responce = await fetch(`${host}/${id}.json`, { method: 'DELETE' });
    
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