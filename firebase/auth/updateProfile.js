import firebase_app from "../config";
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth(firebase_app);
export default async function _updateProfile(update_data) {
  var error = null;
  await updateProfile(auth.currentUser, update_data).then(() => {
    console.log(auth.currentUser.displayName);
  });

  return error;
}
