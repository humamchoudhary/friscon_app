import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUSQte3A0XWlLbx15--wgismPTCR72cU8",
  authDomain: "friscon-app.firebaseapp.com",
  projectId: "friscon-app",
  storageBucket: "friscon-app.appspot.com",
  messagingSenderId: "1072297402071",
  appId: "1:1072297402071:web:c678ac64da6f46bc3a1a92",
  measurementId: "G-MBZJ3F9W63",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app, "gs://friscon-app.appspot.com");