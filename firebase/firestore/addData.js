import firebase_app from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData(colllection, data) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, colllection), data, {
      merge: true,
    });
  } catch (e) {
    error = e.message;
  }

  return { result, error };
}
