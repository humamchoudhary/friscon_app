// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");

exports.stripeRedirect = functions.https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key, {
    apiVersion: "2022-11-15",
  });
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: data.amount,
    });
    const clientSecret = paymentIntent.client_secret;
    return new Promise((resolve, reject) => {
      resolve({
        clientSecret: clientSecret,
      });
    });
  } catch (e) {
    console.log(e);
    return {error: e.message};
  }
});

exports.createSellerID = functions.https.onCall((data, context) => {
  console.log(data);
  return data;
});
