import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANRgn3-VnqQWNJjrc7XBxG7HN5Kc-XbtQ",
  authDomain: "ai-travel-planner-f5d8c.firebaseapp.com",
  projectId: "ai-travel-planner-f5d8c",
  storageBucket: "ai-travel-planner-f5d8c.firebasestorage.app",
  messagingSenderId: "253376156463",
  appId: "1:253376156463:web:61f7a3c39155a0677ac7da",
  measurementId: "G-9MWZFLW901"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);