import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDS1HS2aLSKtGUObHZsooOiIR_CbuEk5aQ",
  authDomain: "notification-task-77cb2.firebaseapp.com",
  projectId: "notification-task-77cb2",
  storageBucket: "notification-task-77cb2.appspot.com",
  messagingSenderId: "66764688610",
  appId: "1:66764688610:web:1dbad9a0bcd5f3ae1ee2bb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
