
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js';
const firebaseConfig = {
  apiKey: "AIzaSyBYs7mbI6kItFQeV6GwPv1oWsITInJ1RdE",
  authDomain: "todo-1a2d7.firebaseapp.com",
  databaseURL: "https://todo-1a2d7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-1a2d7",
  storageBucket: "todo-1a2d7.firebasestorage.app",
  messagingSenderId: "474579066585",
  appId: "1:474579066585:web:b4cfd3a278c5eb8a2568c8",
  measurementId: "G-HL2VTF2H1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth, createUserWithEmailAndPassword };