import { host } from '../host.js';
import { getUserInfo } from '../../src/utils/authHelper.js';

export async function updateTaskOrderOnServer(taskId, order) {
  try {
    const {uid, token} = await getUserInfo();

    const responce = await fetch(`${host}/${uid}/${taskId}.json?auth=${token}`, {
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