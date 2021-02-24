const bookingCalendarBtn = document.querySelector(".toBookingCalendarBtn");

// Description card click to flip the card with tablet & phone view
const card = document.querySelector(".card-phone");
const cardInner = document.querySelectorAll(".cardInner-phone");
const cardFront = document.querySelectorAll(".cardFront-phone");
const cardBack = document.querySelectorAll(".cardBack-phone");

cardInner.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.style.transform === "rotateY(180deg)"
      ? (e.currentTarget.style.transform = "rotateY(0deg)")
      : (e.currentTarget.style.transform = "rotateY(180deg)");
  });
});
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
