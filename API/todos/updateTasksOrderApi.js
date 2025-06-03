import { host } from '../host.js';

export async function updateTaskOrderOnServer(taskId, order) {
  try {
    const responce = await fetch(`${host}/${taskId}.json`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify({ order }),
  });

    if(!responce.ok) {
      throw new Error (`Не удалось обновить порядок задач. Статус: ${responce.status}`);
    }
  } catch (error) {
    console.error(`Ошибка обновления порядка задач:`, error.message);
    throw error;
  }
}