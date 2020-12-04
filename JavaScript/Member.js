// firebase.initializ
const db = firebase.firestore();
const firestoreCollection = db.collection("bookingday");

// Get Session Storage Data
const user = sessionStorage.getItem("user");
const uid = JSON.parse(user);
console.log(uid);

let memberBookingHistoryData = [];

const customerHistoryWrapper = document.querySelector(
  ".customerHistoryWrapper"
);

// Create Element To Put Inside Data

let petName = document.createElement("div");
petName.classList.add("petName");
customerHistoryWrapper.appendChild(petName);

let contactPhone = document.createElement("div");
contactPhone.classList.add("contactPhone");
customerHistoryWrapper.appendChild(contactPhone);

let email = document.createElement("div");
email.classList.add("email");
customerHistoryWrapper.appendChild(email);

let lineId = document.createElement("div");
lineId.classList.add("lineId");
customerHistoryWrapper.appendChild(lineId);

let walkingLocation = document.createElement("div");
walkingLocation.classList.add("walkingLocation");
customerHistoryWrapper.appendChild(walkingLocation);

let remind = document.createElement("div");
remind.classList.add("remind");
customerHistoryWrapper.appendChild(remind);

firestoreCollection
  .where("uid", "==", uid)
  .get()
  .then(function (doc) {
    doc.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      //   memberBookingHistoryData.push(doc.data());
      console.log(doc.data());

      //   for (let z = 0; z < memberBookingHistoryData.length; z++) {
      let ownerName = document.createElement("div");
      ownerName.classList.add("ownerName");
      customerHistoryWrapper.appendChild(ownerName);
      ownerName.innerHTML = doc.data().owner;

      // petName.innerHTML = memberBookingHistoryData[z].pet;
      //   }
    });
  });
