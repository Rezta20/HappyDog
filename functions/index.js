// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const cors = require("cors")({ orgin: true });

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

// Firebase firestore initializ
const db = firebase.firestore();
const firestoreCollection = db.collection("bookingday");

// Get Session Storage Data
// const user = sessionStorage.getItem("user");
// const uid = JSON.parse(user);
// console.log(uid);

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
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.emailSender = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const queryStringParams = req.query.orderId;
    console.log(queryStringParams);

    firestoreCollection
      .doc(`${queryStringParams}`)
      .get()
      .then(function (doc) {
        console.log(doc.data());

        const mailOptions = {
          from: "wang.happydog@gmail.com",
          to: `${doc.data().email}`,
          subject: "快樂狗預約通知",
          html: `

          <table style="margin: 20px auto;width: 800px" >
          <tr><td style=" text-align:center; display:block"><a href=""><img width="430" height="auto" src="https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/logo%2Flogopress.png?alt=media&token=d9a4356d-7204-4544-9430-8fe3b453263c"></td></tr>
          </table></a>
          <p style="margin:20px auto;color:#063F6F; font-size:18px;text-align:center;">THANK YOU FOR YOUR BOOKING！</p>
          <p style="margin:20px auto;color:#063F6F; font-size:18px;text-align:center;">Hi，<b>${
            doc.data().owner
          }</b>，感謝您這次的預約！</p>
          <p style="margin:20px auto;color:#063F6F; font-size:18px;text-align:center;">我們已確實收到您的訂單 #${queryStringParams}</p>
          
          
          
          <table style="margin: 20px auto; border:2px solid #063F6F; width: 460px; font-size:18px; background-color:#FFF">
              <thead colspan="4" style="background-color: #063F6F; color:#fff;">
                  <tr>
                      <th colspan="4">預約訂單資料</th>
                  </tr>
              </thead>
              <tbody style="text-align:center">
                  <tr>
                      <td style="color:#063F6F ;width:190px;height:40px">寵物名字：</td>
                      <td style="color:#063F6F;height:40px">${
                        doc.data().pet
                      }</td>
                  </tr>
          <tr>
                      <td style="color:#063F6F;height:40px">聯絡電話：</td>
                      <td style="color:#063F6F;height:40px">${
                        doc.data().phone
                      }</td>
                  </tr >
          <tr>
                      <td style="border-right: solid 24px #FFF; color:#063F6F;height:40px">Line ID:</td>
                      <td style="color:#063F6F;height:40px">${
                        doc.data().Line
                      }</td>
                  </tr>
          <tr>
                      <td style="color:#063F6F;height:40px">預約日期：</td>
                      <td style="color:#063F6F;height:40px">${
                        doc.data().bookingDayStr
                      }</td>
                  </tr>
          <tr>
                      <td style="color:#063F6F;height:40px">預約時間：</td>
                      <td style="color:#063F6F;height:40px">${
                        doc.data().bookingtime
                      }</td>
                  </tr>
          <tr>
                      <td style="color:#063F6F;height:40px">遛狗地點：</td>
                      <td style="color:#063F6F;height:40px">${
                        doc.data().location
                      }</td>
                  </tr>
          
          <tr>
                      <td colspan="2" style="border-left:solid 50px #FFF ;text-align:left; color:#063F6F; height:40px">我們應該注意的事情：</td>
                     
                  </tr>
          <tr>
                      <td colspan="2" style="border-left:solid 50px #FFF;text-align:left; color:#063F6F; height:40px">${
                        doc.data().remind
                      }</td>
                  </tr>
              </tbody>
          </table>`,
        };

        return transport.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.send(err.toString());
          }
          return res.send("Email sent successfully");
        });
      });
  });
});
