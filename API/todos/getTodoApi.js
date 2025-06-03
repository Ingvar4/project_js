//переделываем функию getData в getTodos
import { host } from '../host.js';

export async function getTodos() {
  try {
    const responce = await fetch(`${host}.json`); //method GET

    if(!responce.ok) {
      throw new Error (`Данные не получены. Статус: ${responce.status}`)
    }
    
    const data = await responce.json();
    console.log('Данный получены', data);

    if (!data) {
      throw new Error('Задач нет');
    }

    const todosArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }))

    todosArray.sort((a, b) => a.order - b.order);
    return todosArray;
  } catch (error) {
    console.error(`Ошибка получения данных:`, error.message);
    throw error;
  }
}