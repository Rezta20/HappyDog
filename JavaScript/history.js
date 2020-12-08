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

firestoreCollection
  .where("uid", "==", uid)
  .get()
  .then(function (doc) {
    doc.forEach(function (doc) {
      console.log(doc.data());

      // Create Element To Put Inside Data
      // Owner
      let ownerWrapper = document.createElement("div");
      ownerWrapper.classList.add("ownerWrapper");
      customerHistoryWrapper.appendChild(ownerWrapper);

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
      customerHistoryWrapper.appendChild(petWrapper);

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
      customerHistoryWrapper.appendChild(contactPhoneWrapper);

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
      customerHistoryWrapper.appendChild(emailWrapper);

      let contactPhoneTitle = document.createElement("div");
      contactPhoneTitle.classList.add("contactPhoneTitle");
      emailWrapper.appendChild(contactPhoneTitle);
      contactPhoneTitle.innerHTML = "聯絡電話:";

      let email = document.createElement("div");
      email.classList.add("email");
      customerHistoryWrapper.appendChild(email);
      email.innerHTML = doc.data().email;

      let lineId = document.createElement("div");
      lineId.classList.add("lineId");
      customerHistoryWrapper.appendChild(lineId);
      lineId.innerHTML = doc.data().Line;

      let walkingLocation = document.createElement("div");
      walkingLocation.classList.add("walkingLocation");
      customerHistoryWrapper.appendChild(walkingLocation);
      walkingLocation.innerHTML = doc.data().location;

      let remind = document.createElement("div");
      remind.classList.add("remind");
      customerHistoryWrapper.appendChild(remind);
      remind.innerHTML = doc.data().remind;
    });
  });
