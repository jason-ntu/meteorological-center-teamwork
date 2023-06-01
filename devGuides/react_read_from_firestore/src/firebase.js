// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGlztM8W9Hoh-RW05ML4WKdh0Ctvf-540",
  authDomain: "cloud-native-2d0c3.firebaseapp.com",
  projectId: "cloud-native-2d0c3",
  storageBucket: "cloud-native-2d0c3.appspot.com",
  messagingSenderId: "315481508767",
  appId: "1:315481508767:web:6ca7cd099f578e09048baa"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;