import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: "AIzaSyA8FQ76YQBxNssAnoTlcDiBnHEYPYl0Vlo",
  authDomain: "mybills-98474.firebaseapp.com",
  projectId: "mybills-98474",
  storageBucket: "mybills-98474.appspot.com",
  messagingSenderId: "893513124000",
  appId: "1:893513124000:web:ed57fb63db44caf66361c5",
  measurementId: "G-GQ5K22L33H",
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });