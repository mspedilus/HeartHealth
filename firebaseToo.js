import { initializeApp,  } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDSrSZNtbfb9v7NXPQdebixAomh2UL3IYE",
  authDomain: "hf-wearable-device.firebaseapp.com",
  databaseURL: "https://hf-wearable-device-default-rtdb.firebaseio.com",
  projectId: "hf-wearable-device",
  storageBucket: "hf-wearable-device.appspot.com",
  messagingSenderId: "972933487222",
  appId: "1:972933487222:web:7330581d41a65ee3235d57",
  measurementId: "G-JM7T1WT9YT"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
