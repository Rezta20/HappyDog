// Firebase firestore initializ
const db = firebase.firestore();
const firestoreCollection = db.collection("bookingday");

// Get Session Storage Data
const user = sessionStorage.getItem("user");
const uid = JSON.parse(user);
console.log(uid);

const customerHistoryWrapper = document.querySelector(
  ".customerHistoryWrapper"
);
const customerWrapper = document.querySelector(".customerWrapper");

// // Firebase 監聽
// window.addEventListener("load", function () {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       const providerData = user.providerData[0];
//       // Get Firebase collection data
firestoreCollection
  .where("uid", "==", uid)
  .get()
  .then(function (doc) {
    doc.forEach(function (doc) {
      console.log(doc.data());

      customerHistoryWrapper.appendChild(customerWrapper);

      // Create Element To Put Inside Data
      // Owner
      let ownerWrapper = document.createElement("div");
      ownerWrapper.classList.add("ownerWrapper");
      customerWrapper.appendChild(ownerWrapper);

      let ownerTitle = document.createElement("div");
      ownerTitle.classList.add("ownerTitle");
      ownerWrapper.appendChild(ownerTitle);
      ownerTitle.innerHTML = "飼主姓名:";

      let ownerName = document.createElement("div");
      ownerName.classList.add("ownerName");
      ownerWrapper.appendChild(ownerName);
      ownerName.innerHTML = doc.data().owner;

      // Pet
      let petWrapper = document.createElement("div");
      petWrapper.classList.add("petWrapper");
      customerWrapper.appendChild(petWrapper);

      let petTitle = document.createElement("div");
      petTitle.classList.add("petTitle");
      petWrapper.appendChild(petTitle);
      petTitle.innerHTML = "寵物姓名:";

      let petName = document.createElement("div");
      petName.classList.add("petName");
      petWrapper.appendChild(petName);
      petName.innerHTML = doc.data().pet;

      //Contact Phone
      let contactPhoneWrapper = document.createElement("div");
      contactPhoneWrapper.classList.add("contactPhoneWrapper");
      customerWrapper.appendChild(contactPhoneWrapper);

      let contactPhoneTitle = document.createElement("div");
      contactPhoneTitle.classList.add("contactPhoneTitle");
      contactPhoneWrapper.appendChild(contactPhoneTitle);
      contactPhoneTitle.innerHTML = "聯絡電話:";

      let contactPhone = document.createElement("div");
      contactPhone.classList.add("contactPhone");
      contactPhoneWrapper.appendChild(contactPhone);
      contactPhone.innerHTML = doc.data().phone;

      // Email
      let emailWrapper = document.createElement("div");
      emailWrapper.classList.add("emailWrapper");
      customerWrapper.appendChild(emailWrapper);

      let emailTitle = document.createElement("div");
      emailTitle.classList.add("emailTitle");
      emailWrapper.appendChild(emailTitle);
      emailTitle.innerHTML = "Email:";

      let email = document.createElement("div");
      email.classList.add("email");
      emailWrapper.appendChild(email);
      email.innerHTML = doc.data().email;

      // Line
      let lineWrapper = document.createElement("div");
      lineWrapper.classList.add("lineWrapper");
      customerWrapper.appendChild(lineWrapper);

      let lineTitle = document.createElement("div");
      lineTitle.classList.add("lineTitle");
      lineWrapper.appendChild(lineTitle);
      lineTitle.innerHTML = "Line ID:";

      let lineId = document.createElement("div");
      lineId.classList.add("lineId");
      lineWrapper.appendChild(lineId);
      lineId.innerHTML = doc.data().Line;

      // Walking location
      let walkingWrapper = document.createElement("div");
      walkingWrapper.classList.add("walkingWrapper");
      customerWrapper.appendChild(walkingWrapper);

      let walkingTitle = document.createElement("div");
      walkingTitle.classList.add("walkingTitle");
      walkingWrapper.appendChild(walkingTitle);
      walkingTitle.innerHTML = "遛狗地點:";

      let walkingLocation = document.createElement("div");
      walkingLocation.classList.add("walkingLocation");
      walkingWrapper.appendChild(walkingLocation);
      walkingLocation.innerHTML = doc.data().location;

      // Remind
      let remindWrapper = document.createElement("div");
      remindWrapper.classList.add("remindWrapper");
      customerWrapper.appendChild(remindWrapper);

      let remindTitle = document.createElement("div");
      remindTitle.classList.add("remindTitle");
      remindWrapper.appendChild(remindTitle);
      remindTitle.innerHTML = "我們應該注意的事情：";

      let remind = document.createElement("div");
      remind.classList.add("remind");
      remindWrapper.appendChild(remind);
      remind.innerHTML = doc.data().remind;
    });
  });
//     } else {
//     }
//   });
// });
