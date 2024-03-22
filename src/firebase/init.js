// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwkk21iXUoge_UIbiT7ZGrI8czcJr7Cc0",
  authDomain: "vuejs-project-435af.firebaseapp.com",
  projectId: "vuejs-project-435af",
  storageBucket: "vuejs-project-435af.appspot.com",
  messagingSenderId: "935748445717",
  appId: "1:935748445717:web:4c4249f6ca8f003647101c"
};
// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db

