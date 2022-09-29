import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCD10KucIjlrPVxGK8hlKdv4_Hc7tHeAnE",
  authDomain: "egnproject-2a600.firebaseapp.com",
  databaseURL: "https://egnproject-2a600.firebaseio.com/",
  projectId: "egnproject-2a600",
  storageBucket: "egnproject-2a600.appspot.com",
  messagingSenderId: "517236214863",
  appId: "1:517236214863:web:1fff67b54f558706b0ee3a",
};

 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
