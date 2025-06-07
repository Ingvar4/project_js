import { auth, signInWithEmailAndPassword } from "../../../scripts/firebaseConfig.js";
import { loadData } from "../index.js";

const signinForm = document.getElementById('signin-form');
const taskContainer = document.getElementById('task-container');

signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('signin-email').value;

  const password = document.getElementById('signin-password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );

    const user = userCredential.user;
    console.log('Пользователь авторизован', user.uid);
    
    // alert('Авторизация прошла успешно');
    hideSigninForm();
    showTasksBlock();
    loadData();
  } catch (error) {
    console.error('Ошибка авторизации', error.message, error.code);
    alert(`Ошибка авторизации: ${error.message}`);
  }
});

export function showTasksBlock() {
  taskContainer.style.display = "block";
}

export function hideSigninForm() {
  signinForm.style.display = "none";
}