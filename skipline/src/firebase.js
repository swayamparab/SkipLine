// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwzW7YcZsK7KjfGAseQ9Cqwu6EPs5aHfg",
  authDomain: "skiplineauth.firebaseapp.com",
  projectId: "skiplineauth",
  storageBucket: "skiplineauth.firebasestorage.app",
  messagingSenderId: "1011836867191",
  appId: "1:1011836867191:web:98dde39c3e05177efaac72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
export const auth = getAuth(app);