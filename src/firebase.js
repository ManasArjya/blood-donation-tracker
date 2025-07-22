import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw5lARRmD-H84Ye7WiW0YhPt3rrbAkGfs",
  authDomain: "blood-donation-tracker-6e354.firebaseapp.com",
  projectId: "blood-donation-tracker-6e354",
  storageBucket: "blood-donation-tracker-6e354.firebasestorage.app",
  messagingSenderId: "632921416734",
  appId: "1:632921416734:web:07daa118c8c56dfb3f7a0f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
