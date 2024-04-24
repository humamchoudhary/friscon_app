import firebase_app from "../config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export default async function signUp(email, password, username) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    if (result) {
      updateProfile(auth.currentUser, {
        displayName: username,
      });
      const { uid } = result.user;
      console.log(uid);

      setDoc(doc(db, "users", uid), {
        email: email,
        name: username,
        cart: [],
        address: "",
      });
    }
  } catch (e) {
    error = e;
    console.log(e.message);
  }

  return { result, error };
}
