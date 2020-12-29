const timeBtn = document.querySelectorAll(".timeBtn");
const sendDataBtn = document.querySelector(".sendBookingDatedataBtn");
const monthBtn = document.querySelector(".monthBtn");
const timeTitleWrapper = document.querySelector(".timeTitleWrapper");
const morningBtnWrapper = document.querySelector(".timeBtnMorningWrapper");
const afternoonBtnWrapper = document.querySelector(".timeBtnAfternoonWrapper");
const eveningBtnWrapper = document.querySelector(".timeBtnEveningWrapper");
const selectedDateColor = document.querySelector(".fc-daygrid-day-events");
// Store Pick Date Data
let bookingTimeData = {};

// Full Calendar
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const monthViewDescription = document.querySelector(
    ".bookingDescriptionMonthViewWrapper"
  );
  const weekViewDescription = document.querySelector(
    ".bookingDescriptionWeekViewWrapper"
  );
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
      if (view.type === "dayGridWeek") {
        // Set Selected Date
        bookingTimeData.bookingDateStr = info.startStr;
        bookingTimeData.bookingDateEnd = info.endStr;
      }
    },

    height: "auto",
  });
  calendar.render();

  //  Change View to Month (click right-top month Button)
  function changeViewToMonth() {
    calendar.changeView("dayGridMonth");
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
  monthBtn.addEventListener("click", changeViewToMonth);
});

// Set Selected Time
timeBtn.forEach((e) => {
  e.addEventListener("click", () => {
    bookingTimeData.time = e.innerText;

    timeBtn.forEach((a) => {
      a.style.boxShadow = "";
    });

    e.style.boxShadow = "2px 2px rgb(63,58,58,0.3) inset";
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
