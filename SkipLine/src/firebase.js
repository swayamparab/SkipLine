import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

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

export const db = getFirestore(app);