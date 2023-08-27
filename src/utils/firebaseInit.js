// firebaseInit.js
import { initializeApp } from "firebase/app";

// Firebase configuration from your provided details
const firebaseConfig = {
  apiKey: "AIzaSyALY_L5QAVWGS_fx4oYJ8b3Fg-ni8sIELk",
  authDomain: "recipes-app-6538e.firebaseapp.com",
  databaseURL: "https://recipes-app-6538e-default-rtdb.firebaseio.com",
  projectId: "recipes-app-6538e",
  storageBucket: "recipes-app-6538e.appspot.com",
  messagingSenderId: "943409972016",
  appId: "1:943409972016:web:a0ab10c3f46f8b245b3ef5",
  measurementId: "G-RJWRPB172G",
};

const initializedFirebaseApp = initializeApp(firebaseConfig);

export { initializedFirebaseApp };
