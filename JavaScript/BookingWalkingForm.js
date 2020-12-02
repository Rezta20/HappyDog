const sendDataBtn = document.querySelector(".sendBookingDetailBtn");
const owner = document.querySelector(".ownerName");
const pet = document.querySelector(".petName");
const phone = document.querySelector(".contactPhone");
const email = document.querySelector(".email");
const lineId = document.querySelector(".lineId");
const walkingLocation = document.querySelector(".location");
const remind = document.querySelector(".remind");

// FireStore Set up
firebase.initializeApp({
  apiKey: "apiKey",
  projectId: "happydog-82c2f",
  authDomain: "happydog-82c2f.firebaseapp.com",
  databaseURL: "https://happydog-82c2f.firebaseio.com/",
});
var db = firebase.firestore();

// 從sessionStorage取得之前存的資料
const data = sessionStorage.getItem("bookingTimeData");
const bookingTimeData = JSON.parse(data);
const user = sessionStorage.getItem("user");
const uid = JSON.parse(user);
console.log(uid);

console.log(data);
console.log(bookingTimeData);

sendDataBtn.addEventListener("click", sendBookingDetail);

function sendBookingDetail() {
  // Set Data To Firestore
  db.collection("bookingday")
    .doc()
    .set({
      uid: uid,
      owner: owner.value,
      pet: pet.value,
      phone: phone.value,
      email: email.value,
      Line: lineId.value,
      location: walkingLocation.value,
      remind: remind.value,
      bookingDayStr: bookingTimeData.bookingDateStr,
      bookingDayEnd: bookingTimeData.bookingDateEnd,
      bookingtime: bookingTimeData.time,
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });

  // Jump to Thankyou page
  location.href = "/html/booking/BookingThankYou.html";
}

// Firebase Log In 監聽
window.addEventListener("load", function () {
  firebase.auth().onAuthStateChanged((user) => {
    console.log("hello there");
    console.log(user);
    if (user) {
      console.log("sign in");
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log(user);
      // logInCard.style.display = "none";
      // ...
    } else {
      console.log("nothing");
      // User is signed out
      // ...
    }
  });
});
