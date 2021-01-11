/* eslint-disable no-undef */
const backPhone = document.querySelectorAll(".back-phone");
const body = document.querySelector("body");
const bookingCalendarBtn = document.querySelector(".toBookingCalendarBtn");
const card = document.querySelectorAll(".card");
const descriptionTitle = document.querySelectorAll(".descriptionTitle");
const frontPhone = document.querySelectorAll(".front");
const inner = document.querySelectorAll(".inner");

// for (let i = 0; i < front.length; i++) {
//   if (front[i].style.display === "") {
//     front[i].addEventListener("click", function () {
//       front[i].style.display = "none";
//       backPhone[i].style.display = "flex";

//       if (backPhone[i].style.display === "flex") {
//         backPhone[i].addEventListener("click", function () {
//           front[i].style.display = "flex";
//           backPhone[i].style.display = "none";
//         });
//       }
//     });
//   }
// }

for (let i = 0; i < frontPhone.length; i++) {
  if (frontPhone[i].style.display === "") {
    frontPhone[i].addEventListener("click", function () {
      frontPhone[i].style.display = "none";
      backPhone[i].style.display = "flex";

      backPhone[i].style.transform = "rotateY(180deg)";
      inner[i].style.transform = "rotateY(180deg)";
      inner[i].style.transition = "transform 0.8s";

      if (backPhone[i].style.display === "flex") {
        backPhone[i].addEventListener("click", function () {
          frontPhone[i].style.transform = "rotateY(-180deg)";
          inner[i].style.transform = "rotateY(-180deg)";
          inner[i].style.transition = "transform 0.8s";
          frontPhone[i].style.display = "flex";
          backPhone[i].style.display = "none";
        });
      }
    });
  }

  //     else if (e.target !== front[i] || descriptionTitle[i]) {
  //     //   console.log("hi");
  //     //   front[i].style.display = "flex";
  //     //   backPhone[i].style.display = "none";
  //     // }
  //   }
}

// Log in first, then could use the booking system
bookingCalendarBtn.addEventListener("click", defaultLogin);

function defaultLogin() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const providerData = user.providerData[0];

      location.href = "../Booking/calendar.html";
    } else {
      Swal.fire({
        title: "請先登入帳號",
        icon: "warning",
        confirmButtonText: "確定",
      }).then(function () {
        location.href = "../Login/login.html";
      });
    }
  });
}
