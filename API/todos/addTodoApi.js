import { host } from '../host.js';
//5. Реализовать добавление новой задачи (CREATE)
export async function addTodo(newTodo) {
  try {
    const responce = await fetch(`${host}.json`, {
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