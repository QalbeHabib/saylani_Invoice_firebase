import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClon9mREjjdFJOn5YSJKYTgfoOkpfN2r8",
  authDomain: "invoice-app-66d49.firebaseapp.com",
  projectId: "invoice-app-66d49",
  storageBucket: "invoice-app-66d49.appspot.com",
  messagingSenderId: "495979506880",
  appId: "1:495979506880:web:814e6dfc5817bcad40d125",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
