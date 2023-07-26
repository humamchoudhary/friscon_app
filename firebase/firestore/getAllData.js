import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function getAllData(col) {
  let result = [];
  let error = null;
  const querySnapshot = await getDocs(collection(db, col));

  try {
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, data: doc.data() });
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
