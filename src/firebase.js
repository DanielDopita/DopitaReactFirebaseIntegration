import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB56Kuy56NZz97FLt85ThQewysFazk1ul0",
    authDomain: "reacttaskmanager-47556.firebaseapp.com",
    projectId: "reacttaskmanager-47556",
    storageBucket: "reacttaskmanager-47556.firebasestorage.app",
    messagingSenderId: "403944587153",
    appId: "1:403944587153:web:1055f3cf338fc0bc00a430",
    measurementId: "G-Q3ZCMSJXWN"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);