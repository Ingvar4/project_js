import { host } from '../host.js';

export async function deleteCompletedTodos(container) {
  try {
    const completedTodos = Array.from(container.querySelectorAll('.todo')).filter((todoElement) => {
      const checkbox = todoElement.querySelector('input[type="checkbox"]');
      return checkbox.checked;
    });

    for (const todoElement of completedTodos) {
      const taskId = todoElement.getAttribute('data-id');

      const deleteResponce = await fetch(`${host}/${taskId}`, {
        method: 'DELETE',
      });
      if (!deleteResponce.ok) {
        throw new Error(`Не удалось удалить список выполненных задач. Статус: ${deleteResponce.status}`);
      }
    }
    return true;
  } catch (error) {
    console.error('Ошибка удаления выполненных задач:', error.message);
    throw error;
  }
}