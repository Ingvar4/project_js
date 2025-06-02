export function createTime(todo) {
  const timeElement = document.createElement('p'); //создаём элемент с датой и форматируем её
  timeElement.textContent = new Date(todo.createdAt).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return timeElement;
}