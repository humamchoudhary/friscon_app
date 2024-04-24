import "firebase/functions";
import firebase_app from "../config";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";

const functions = getFunctions(firebase_app);

export default fetchCheckoutSession = async (listItems, amount) => {
  console.log("dsa");
  const response = await httpsCallable(
    functions,
    "stripeRedirect"
  )({ listItems: listItems, amount: amount * 100 });
  const { clientSecret, error } = await response.data;
  console.log({ clientSecret, error });
  return { clientSecret, error };
};
