import firebase_app from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function updateData(colllection, id, data) {
  
  let error = null;

  try {
     await updateDoc(doc(db, colllection, id), data);
  } catch (e) {
    error = e.message;
  }

  return {  error };
}
