import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export default async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    await getDoc(doc(db, "Users", result.user.uid)).then((snap) => {});
  } catch (e) {
    error = e;
  }

  return { result, error };
}
