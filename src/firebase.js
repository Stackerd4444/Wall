// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFkLx4kCrAetAfsd7ytsUzKFBtizcStWI",
  authDomain: "wall-app-88dc4.firebaseapp.com",
  projectId: "wall-app-88dc4",
  storageBucket: "wall-app-88dc4.appspot.com",
  messagingSenderId: "13357096300",
  appId: "1:13357096300:web:ee3e002bfff12b018ee749",
  measurementId: "G-JW8KMXVN7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firestore = getFirestore(app);
