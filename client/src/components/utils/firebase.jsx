// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//tukituki-ca702.firebaseapp.com
const firebaseConfig = {
  apiKey: "AIzaSyATiRG9KYAqu9wSY-3YKYKDMrLSmT-SfBc",
  authDomain: "wasap-67100.firebaseapp.com",
  projectId: "wasap-67100",
  storageBucket: "wasap-67100.appspot.com",
  messagingSenderId: "880547516713",
  appId: "1:880547516713:web:3221171e098b1725cf2738",
  measurementId: "G-CQ7SZH88XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)