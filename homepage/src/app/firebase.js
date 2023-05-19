// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRH5yFCPv5KzRSanHEKmEeU6ANQsAVL8I",
  authDomain: "cloud-native-9ec37.firebaseapp.com",
  projectId: "cloud-native-9ec37",
  storageBucket: "cloud-native-9ec37.appspot.com",
  messagingSenderId: "410456454191",
  appId: "1:410456454191:web:2d90ade9d5c647ec5242da",
  measurementId: "G-5WLG3HLQ9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;