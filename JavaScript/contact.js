const sendDataBtn = document.querySelector(".sendBookingDetailBtn");
const owner = document.querySelector(".ownerName");
const phone = document.querySelector(".contactPhone");
const email = document.querySelector(".email");
const lineId = document.querySelector(".lineId");
const remind = document.querySelector(".remind");

// FireStore Set up
const db = firebase.firestore();

// Set Data To Firestore
sendDataBtn.addEventListener("click", sendBookingDetail);

function sendBookingDetail() {
  // 判斷是否有填資料
  if (owner.value === "") {
    Swal.fire({
      title: "請輸入姓名",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else if (phone.value === "") {
    Swal.fire({
      title: "請填寫電話",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else if (email.value === "") {
    Swal.fire({
      title: "請填寫Email",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else {
    sendDataBtn.disabled = true;
    sendDataBtn.innerText = "資料上傳中";
    sendDataBtn.style.boxShadow = "2px 2px rgb(63,58,58,0.3) inset";

    db.collection("contactForm")
      .add({
        name: owner.value,
        phone: phone.value,
        email: email.value,
        Line: lineId.value,
        remind: remind.value,
      })
      .then(function (docRef) {
        console.log("Document successfully written!");
        document.querySelector(".loadingWrapper").style.display = "block";
        document.querySelector(".contentWrapper").style.display = "none";
        // Jump to Thankyou page
        location.href = "/Html/Contact/contactThankYou.html";
        sendDataBtn.disabled = false;
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
}
