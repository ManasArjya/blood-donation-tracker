import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "Your Key",
  authDomain: "Your firebase domain",
  projectId: "your project id",
  storageBucket: "your storage bucket",
  messagingSenderId: "your sender id",
  appId: "1your app id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
