import { 
  initDeleteCompleted,  
  initAddTodo,
  hideSigninForm,
  hideSignupForm, 
} from '../src/components/index.js';

import { auth, onAuthStateChanged } from './firebaseConfig.js';
import { loadData } from '../src/components/index.js';
import { showTasksBlock } from '../src/components/index.js';
import { showWarning } from '../src/utils/notification.js';

export function initApp() {
  onAuthStateChanged(auth, (user) => {
    if(user) {
      if(!user.emailVerified) {
        showWarning('Ваш email не верифицирован, проверьте почту.');
        return;
      }
      loadData();
      hideSigninForm();
      hideSignupForm();
      showTasksBlock();
    } else {
      console.log('Пользователь не авторизован');
      document.getElementById('signup-form').style.display = 'block';
    }
  });
  initAddTodo();
  initDeleteCompleted();
}