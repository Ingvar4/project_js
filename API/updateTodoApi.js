import { host } from '../scripts/16other.js';
//6. Реализовать обновление текста существующей задачи (UPDATE)
export async function updateTodo(id, newText) {
  try {
    const responce = await fetch(`${host}/${id}`, {
      method: 'PUT',
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