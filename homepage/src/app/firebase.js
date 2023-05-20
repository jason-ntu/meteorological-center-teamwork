// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJSZsgm10ZIep4CVpiYrX8k00gOEVANGc",
  authDomain: "cloud-native-f1d5a.firebaseapp.com",
  projectId: "cloud-native-f1d5a",
  storageBucket: "cloud-native-f1d5a.appspot.com",
  messagingSenderId: "196942879318",
  appId: "1:196942879318:web:511e05c571abcb78a779f7",
  measurementId: "G-EJC50Y1EWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;