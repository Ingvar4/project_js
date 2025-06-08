import { showError } from "../../utils/notification.js";
import { loadData } from "../index.js";
import { updateTodo } from "../../../API/index.js";

export async function updateTask(todo) {
  //Добавляем для 6 пункта, обновление текста существующей задачи
  //переписываем prompt под библиотеку SweetAlert
  const { value: newText } = await Swal.fire({
    title: 'Редактирование задачи',
    input: 'text',
    inputLabel: 'Введите текст новой задачи',
    inputValue: todo.text,
    showCancelButton: true,
    confirmButtonText: 'Сохранить',
    inputValidator: (value) => {
      if (!value) {
        return 'Поле не может быть пустым!';
      }
    },
  });

  if (newText) {
    try {
      await updateTodo(todo.id, newText);
      await loadData();
    } catch (error) {
      showError('Не удалось обновить задачу');
    }
  }
  // const newText = prompt('Введите новый текст задачи', todo.text);
  // if (newText) {
  //   try {
  //     await updateTodo(todo.id, newText);
  //     await loadData();
  //   } catch (error) {
  //     console.error(error.message);
  //     showError('Не удалось обновить задачу');
  //   }
  // }
}