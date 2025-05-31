//переделываем функию getData в getTodos
import { host } from '../scripts/16other.js';

export async function getTodos() {
  try {
    const responce = await fetch(host);

    if(!responce.ok) {
      throw new Error (`Данные не получены. Статус: ${responce.status}`)
    }
    
    const data = await responce.json();
    console.log('Данный получены', data);
    return data;
  } catch (error) {
    console.error(`Ошибка получения данных:`, error.message);
    throw error;
  }
}