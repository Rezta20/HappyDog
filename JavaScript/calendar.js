const afternoonBtnWrapper = document.querySelector(".timeBtnAfternoonWrapper");
const eveningBtnWrapper = document.querySelector(".timeBtnEveningWrapper");
const monthBtn = document.querySelector(".monthBtn");
const monthViewDescription = document.querySelector(
  ".bookingDescriptionMonthViewWrapper"
);
const morningBtnWrapper = document.querySelector(".timeBtnMorningWrapper");
const selectedDateColor = document.querySelector(".fc-daygrid-day-events");
const sendDataBtn = document.querySelector(".sendBookingDatedataBtn");
const timeBtns = document.querySelectorAll(".timeBtn");
const timeTitleWrapper = document.querySelector(".timeTitleWrapper");
const weekViewDescription = document.querySelector(
  ".bookingDescriptionWeekViewWrapper"
);

// Store Pick Date Data
let bookingTimeData = {};

function hiddenTimeBtn() {
  monthViewDescription.style.display = "block";
  weekViewDescription.style.display = "none";

  timeTitleWrapper.style.opacity = "0";

  morningBtnWrapper.style.maxHeight = "0";
  morningBtnWrapper.style.opacity = "0";

  afternoonBtnWrapper.style.maxHeight = "0";
  afternoonBtnWrapper.style.opacity = "0";

  eveningBtnWrapper.style.maxHeight = "0";
  eveningBtnWrapper.style.opacity = "0";

  sendDataBtn.style.opacity = "0";
}

function showTimeBtn() {
  monthViewDescription.style.display = "none";
  weekViewDescription.style.display = "block";

  timeTitleWrapper.style.opacity = "1";

  morningBtnWrapper.style.opacity = "1";
  morningBtnWrapper.style.maxHeight = "300px";

  afternoonBtnWrapper.style.opacity = "1";
  afternoonBtnWrapper.style.maxHeight = "300px";

  eveningBtnWrapper.style.opacity = "1";
  eveningBtnWrapper.style.maxHeight = "300px";

  sendDataBtn.style.opacity = "1";
}

// Full Calendar
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "  ",
    },
    titleFormat: { year: "numeric", month: "long" },

    unselectAuto: false,

    selectable: true,

    longPressDelay: 0,

    selectLongPressDelay: 0,

    selectAllow: (info) => {
      let now = new Date();
      let end = info.end;
      let selected = info.start;

      // Cannot choose past date
      if (selected < now || end < now) {
        return false;
      }

      // Cannot choose multi day
      if (
        new Date(
          selected.getFullYear(),
          selected.getMonth(),
          selected.getDate() + 1
        ).getTime() == end.getTime()
      ) {
        return true;
      }
      return false;
    },

    select: function (info) {
      let clickedDate = info.start;
      let view = calendar.view;

      // Change View To Week
      if (view.type === "dayGridMonth") {
        calendar.changeView("dayGridWeek");
        calendar.gotoDate(clickedDate);
        calendar.select(clickedDate);

        // Set Selected Dates
        bookingTimeData.bookingDateStr = info.startStr;
        bookingTimeData.bookingDateEnd = info.endStr;
        showTimeBtn();
      }
      if (view.type === "dayGridWeek") {
        // Set Selected Date
        bookingTimeData.bookingDateStr = info.startStr;
        bookingTimeData.bookingDateEnd = info.endStr;
      }
    },

    height: "auto",
  });
  calendar.render();

  monthBtn.addEventListener("click", () => {
    calendar.changeView("dayGridMonth");
    hiddenTimeBtn();
  });
});

// Set Selected Time
timeBtns.forEach((timeBtn) => {
  timeBtn.addEventListener("click", () => {
    bookingTimeData.time = timeBtn.innerText;

    timeBtns.forEach((timeBtn) => {
      timeBtn.style.boxShadow = "";
    });
    timeBtn.style.boxShadow = "2px 2px rgb(63,58,58,0.3) inset";
  });
});

// Send Booking Date Button Event
function sendBookingDatatoBookingform() {
  if (bookingTimeData.time === undefined) {
    Swal.fire({
      title: "請選擇時間",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else if (bookingTimeData.time !== undefined) {
    location.href = "/Html/Booking/bookingWalkingForm.html";
  }

  // 將資料存到sessionStorage
  sessionStorage.setItem("bookingTimeData", JSON.stringify(bookingTimeData));
}
sendDataBtn.addEventListener("click", sendBookingDatatoBookingform);
