import { initializeApp,  } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref} from 'firebase/database';



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

// const firebaseConfig = {
//   apiKey: "AIzaSyDSrSZNtbfb9v7NXPQdebixAomh2UL3IYE",
//   authDomain: "hf-wearable-device.firebaseapp.com",
//   databaseURL: "https://hf-wearable-device-default-rtdb.firebaseio.com",
//   projectId: "hf-wearable-device",
//   storageBucket: "hf-wearable-device.appspot.com",
//   messagingSenderId: "972933487222",
//   appId: "1:972933487222:web:7330581d41a65ee3235d57",
//   measurementId: "G-JM7T1WT9YT"
// };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
