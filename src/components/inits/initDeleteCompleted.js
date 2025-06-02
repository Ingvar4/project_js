import { showError } from "../../utils/helpers.js";
import { deleteCompletedTodos } from "../../../API/index.js";
import { deleteCompletedButton, loadData, container } from "../index.js";

export function initDeleteCompleted() {
  //Реализация удаления выполненных задач
  deleteCompletedButton.addEventListener('click', async () => {
    //библиотека SweetAlert2 - A confirm dialog
    //деструктурируем (не работает 'Отменить') потому что функция возвращает объект
    const { isConfirmed } = await Swal.fire({ 
      title: "Вы уверены?",
      text: "Все выполенные задачи будут удалены!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Да, удалить!",
      cancelButtonText: "Отменить",
    });
    
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteCompletedTodos(container);
      await loadData();
    } catch (error) {
      console.error(error.message);
      showError('Не удалось удалить список задач');
    }
  });
}

