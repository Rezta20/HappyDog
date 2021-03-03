/* eslint-disable no-undef */
const email = document.querySelector(".email");
const lineId = document.querySelector(".lineId");
const owner = document.querySelector(".ownerName");
const phone = document.querySelector(".contactPhone");
const remind = document.querySelector(".remind");
const sendDataBtn = document.querySelector(".sendBookingDetailBtn");

//Check Phone Format
function validPhoneNumber(phoneInnerText) {
  if (phoneInnerText.length === 10) {
    for (let i = 0; i < phoneInnerText.length; i++) {
      if (isNaN(parseInt(phoneInnerText[i]))) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

// Check Email Format
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// FireStore Set up
const db = firebase.firestore();

// Set Data To Firestore
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
      title: "請填寫手機號碼",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else if (!validPhoneNumber(phone.value.trim())) {
    Swal.fire({
      title: "請填寫手機格式09xxxxxxxx",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else if (email.value === "") {
    Swal.fire({
      title: "請填寫Email",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else if (!validateEmail(email.value)) {
    Swal.fire({
      title: "請填寫正確的Email格式XXX@xxxxx.xxx",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else {
    // sendDataBtn.disabled = true;
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
      .then(function () {
        document.querySelector(".loadingWrapper").style.display = "block";
        document.querySelector(".contentWrapper").style.display = "none";
        // Jump to Thankyou page
        location.href = "/html/contact/ContactThankyou.html";
        sendDataBtn.disabled = false;
      });
  }
}
sendDataBtn.addEventListener("click", sendBookingDetail);
