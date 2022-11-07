import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, onValue} from 'firebase/database';



const firebaseConfig = {
  apiKey: "AIzaSyCD10KucIjlrPVxGK8hlKdv4_Hc7tHeAnE",
  authDomain: "egnproject-2a600.firebaseapp.com",
  databaseURL: "https://egnproject-2a600-default-rtdb.firebaseio.com",
  projectId: "egnproject-2a600",
  storageBucket: "egnproject-2a600.appspot.com",
  messagingSenderId: "517236214863",
  appId: "1:517236214863:web:1fff67b54f558706b0ee3a",
  measurementId: "G-237KSFEBFT"
};

 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


//Retrieves all data from real time database
export const realTimeDatabaseData = () => {
  const db = getDatabase(app);
  const starCountRef = ref(db);
  let data;
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val()
  });
  return (data)

}
