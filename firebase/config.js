import { initializeApp } from "firebase/app";
// import firebase from "@react-native-firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDUSQte3A0XWlLbx15--wgismPTCR72cU8",
  authDomain: "friscon-app.firebaseapp.com",
  projectId: "friscon-app",
  storageBucket: "friscon-app.appspot.com",
  messagingSenderId: "1072297402071",
  appId: "1:1072297402071:web:c678ac64da6f46bc3a1a92",
  measurementId: "G-MBZJ3F9W63",
};

// Initialize Firebase

const firebase_app = initializeApp(firebaseConfig);

export default firebase_app;
