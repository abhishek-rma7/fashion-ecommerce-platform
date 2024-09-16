// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);

isSupported().then((val) => {
  if (val === true) {
    getAnalytics(app);
  }
});
