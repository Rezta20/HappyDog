// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBL9Tmhwb15yAohPn_DLoAFUgVJoy76bnk",
  authDomain: "happydog-82c2f.firebaseapp.com",
  databaseURL: "https://happydog-82c2f.firebaseio.com",
  projectId: "happydog-82c2f",
  storageBucket: "happydog-82c2f.appspot.com",
  messagingSenderId: "1070136598571",
  appId: "1:1070136598571:web:0de4a08e0493465e984a6e",
  measurementId: "G-N3V1TLZNZW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Firebase firestore initializ
const db = firebase.firestore();
const firestoreCollection = db.collection("bookingday");

// Get Session Storage Data
const user = sessionStorage.getItem("user");
const uid = JSON.parse(user);
console.log(uid);

// Firebase function initializ
const functions = require("firebase-functions");

// Firebase admin initializ
const admin = require("firebase-admin");
admin.initializeApp();

// Nodemailer initializ
const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "wang.happydog@gmail.com",
    pass: "olugfgyptqauvfto",
  },
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.emailSender = functions.https.onRequest((req, res) => {
  const mailOptions = {
    from: "wang.happydog@gmail.com",
    to: "收件者的信箱",
    subject: "test from firebase function with node mailer",
    html: '<h1 style="color:red">say hi</hi>',
  };

  return transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.send(err.toString());
    }
    return res.send("Email sent successfully");
  });
});
