// Set to FireStore Variable
const sendDataBtn = document.querySelector(".sendBookingDetailBtn");
const owner = document.querySelector(".ownerName");
const pet = document.querySelector(".petName");
const phone = document.querySelector(".contactPhone");
const email = document.querySelector(".email");
const lineId = document.querySelector(".lineId");
const bookingDate = document.querySelector(".bookingDate");
const bookingTime = document.querySelector(".bookingTime");
const walkingLocation = document.querySelector(".locationSelect");
const remind = document.querySelector(".remind");

// FireStore Set up
var db = firebase.firestore();

// 從sessionStorage取得之前存的資料
const data = sessionStorage.getItem("bookingTimeData");
const bookingTimeData = JSON.parse(data);
console.log(data);
console.log(bookingTimeData);

// Render Time & date
bookingDate.innerText = bookingTimeData.bookingDateStr;
bookingTime.innerText = bookingTimeData.time;

// Set Data To Firestore
sendDataBtn.addEventListener("click", sendBookingDetail);

function sendBookingDetail() {
  // 判斷是否有填資料

  if (owner.value === "") {
    Swal.fire({
      title: "請輸入飼主姓名",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else if (pet.value === "") {
    Swal.fire({
      title: "請填寫寵物名字",
      icon: "warning",
      confirmButtonText: "確定",
    });
  } else if (phone.value === "") {
    Swal.fire({
      title: "請填寫聯絡電話",
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
    firebase.auth().onAuthStateChanged((user) => {
      const providerData = user.providerData[0];
      if (user) {
        db.collection("bookingDay")
          .add({
            uid: providerData.uid,
            owner: owner.value,
            pet: pet.value,
            phone: phone.value,
            email: email.value,
            Line: lineId.value,
            location: walkingLocation.value,
            remind: remind.value,
            bookingDayStr: bookingTimeData.bookingDateStr,
            bookingtime: bookingTimeData.time,
          })
          .then(function (docRef) {
            // clicked = false;
            console.log("Document successfully written!");
            console.log(docRef.id);
            document.querySelector(".loadingWrapper").style.display = "block";
            document.querySelector(".contentWrapper").style.display = "none";

            // Add id
            db.collection("bookingDay")
              .doc(docRef.id)
              .set({ orderId: docRef.id }, { merge: true });

            // Get location URL
            const queryStringParams = new URLSearchParams(location.search);
            console.log(queryStringParams);
            queryStringParams.set("orderId", docRef.id);
            queryStringParams.toString();
            console.log(queryStringParams.toString());
            // Send Mail API
            fetch(
              `https://us-central1-happydog-82c2f.cloudfunctions.net/emailSender?${queryStringParams.toString()}`
            ).then(function () {
              owner.value = "";
              pet.value = "";
              phone.value = "";
              email.value = "";
              lineId.value = "";
              walkingLocation.value = "";
              remind.value = "";
              bookingTimeData.bookingDateStr = "";
              bookingTimeData.time = "";

              // Jump to Thankyou page
              location.href = "/Html/Booking/bookingThankYou.html";
              sendDataBtn.disabled = false;
            });
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }
    });
  }
}
// Google Map
// let map;

function initMap() {
  // 把地圖上其他標籤都關閉
  let infowindows = [];
  let markers = [];
  let position = [
    {
      label: "華山狗公園",
      lat: 25.050904854011506,
      lng: 121.52373553893794,
      image:
        "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/google%20map%2F%E8%8F%AF%E5%B1%B1%E7%8B%97%E5%85%AC%E5%9C%92.jpg?alt=media&token=00f2deff-e72a-49a8-87d8-59db25185cbe",
      googleMapUrl:
        "https://www.google.com/maps/place/%E8%8F%AF%E5%B1%B1%E5%85%AC%E5%9C%92%E7%8B%97%E6%B4%BB%E5%8B%95%E5%8D%80/@25.0474118,121.5213099,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a96fc3bd20df:0xeb729e5bdac80844!8m2!3d25.047407!4d121.5234986",
    },
    {
      label: "花博公園新生園區",
      lat: 25.073298698969158,
      lng: 121.53129723216047,
      image:
        "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/google%20map%2F%E8%8A%B1%E5%8D%9A%E5%85%AC%E5%9C%92%E6%96%B0%E7%94%9F%E5%9C%92%E5%8D%80.jpg?alt=media&token=224761ef-c506-4fe6-9cc6-2b9bb40cb455",
      googleMapUrl:
        "https://www.google.com/maps/place/%E8%8A%B1%E5%8D%9A%E5%85%AC%E5%9C%92%E6%96%B0%E7%94%9F%E5%9C%92%E5%8D%80/@25.0708333,121.5292002,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a956d210e71b:0x8bc2d6620dacbe60!8m2!3d25.0708333!4d121.5313889",
    },
    {
      label: "榮星花園",
      lat: 25.06362228137099,
      lng: 121.5391411970379,
      image:
        "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/google%20map%2F%E6%A6%AE%E6%98%9F%E8%8A%B1%E5%9C%92.JPG?alt=media&token=f54fa120-a61f-4085-8f88-253b4d7c8249",
      googleMapUrl:
        "https://www.google.com/maps/place/%E6%A6%AE%E6%98%9F%E8%8A%B1%E5%9C%92%EF%BC%88%E9%98%B2%E7%81%BD%E5%85%AC%E5%9C%92%EF%BC%89/@25.0634716,121.5369525,17z/data=!3m1!4b1!4m5!3m4!1s0x3442abe2c5cadddb:0x182c5d5bb1e7067b!8m2!3d25.0634668!4d121.5391412",
    },
    {
      label: "中山公園",
      lat: 25.041654992230285,
      lng: 121.55924633361835,
      image:
        "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/google%20map%2F%E4%B8%AD%E5%B1%B1%E5%85%AC%E5%9C%92.jpg?alt=media&token=019122f6-7a05-4f07-8143-a683bc5c08d6",
      googleMapUrl:
        "https://www.google.com/maps/place/%E4%B8%AD%E5%B1%B1%E5%85%AC%E5%9C%92/@25.038189,121.5567113,17z/data=!4m8!1m2!2m1!1z5Lit5bGx5YWs5ZyS!3m4!1s0x3442abc809c883d1:0x2cb7694caf3e6c67!8m2!3d25.038189!4d121.5589",
    },
    {
      label: "民權公園",
      lat: 25.06402931624652,
      lng: 121.55917117091616,
      image:
        "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/google%20map%2F%E6%B0%91%E6%AC%8A%E5%85%AC%E5%9C%92.jpg?alt=media&token=25aaf3ad-02e6-4c4b-b456-06c43f3d0341",
      googleMapUrl:
        "https://www.google.com/maps/place/%E6%B0%91%E6%AC%8A%E5%85%AC%E5%9C%92/@25.0561268,121.5714965,14z/data=!4m8!1m2!2m1!1z5rCR5qyK5YWs5ZyS!3m4!1s0x3442abf2dd744039:0xc62a3a5cddb93140!8m2!3d25.062045!4d121.558838",
    },
    {
      label: "民生公園",
      lat: 25.05868721484575,
      lng: 121.5576267833872,
      image:
        "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/google%20map%2F%E6%B0%91%E7%94%9F%E5%85%AC%E5%9C%92.jpg?alt=media&token=2aa4a206-6d03-4b1a-97fc-5e3951a134e6",
      googleMapUrl:
        "https://www.google.com/maps/place/%E6%B0%91%E7%94%9F%E5%85%AC%E5%9C%92/@25.0562025,121.5714965,14z/data=!4m8!1m2!2m1!1z5rCR55Sf5YWs5ZyS!3m4!1s0x3442abed197b8995:0xef7b8d1afe69ff42!8m2!3d25.057423!4d121.557828",
    },
    {
      label: "迎風狗公園",
      lat: 25.073119796096105,
      lng: 121.56583476974106,
      image:
        "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/google%20map%2F%E8%BF%8E%E9%A2%A8%E7%8B%97%E5%85%AC%E5%9C%92.jpg?alt=media&token=07f91556-5ab4-483a-9bd2-0a75047ae1a7",
      googleMapUrl:
        "https://www.google.com/maps/place/%E8%BF%8E%E9%A2%A8%E7%8B%97%E9%81%8B%E5%8B%95%E5%85%AC%E5%9C%92/@25.0719278,121.5632733,17z/data=!3m1!4b1!4m5!3m4!1s0x3442ac7427eaf993:0xb9a5db628d6d28b8!8m2!3d25.071923!4d121.565462",
    },
    {
      label: "彩虹河濱公園",
      lat: 25.060436709163,
      lng: 121.57249772241958,
      image:
        "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/google%20map%2F%E5%BD%A9%E8%99%B9%E6%B2%B3%E6%BF%B1%E5%85%AC%E5%9C%92.jpeg?alt=media&token=8d414781-68a7-4dec-8e99-81ecac42b652",
      googleMapUrl:
        "https://www.google.com/maps/search/%E5%BD%A9%E8%99%B9%E6%B2%B3%E6%BF%B1%E5%85%AC%E5%9C%92/@25.0590298,121.5701791,17z/data=!3m1!4b1",
    },
  ];

  let labelStyle = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.05786681303123, lng: 121.53818721912334 },
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: labelStyle,
  });

  for (let l = 0; l < position.length; l++) {
    addMarker(l);
    addinfowindow(l);
    if (l === 2) {
      infowindows[l].open(map, markers[l]);
      infowindows[l].setContent(
        `<h1 id="infowindowsTitle">${position[l].label}</h1>` +
          `<img id="windowPic" src="${position[l].image}" alt="${position[l].label}街景">` +
          `至<a href="${position[l].googleMapUrl}" target='_blank'>Google Map</a>上查看更多`
      );
    }

    // Click markers popup infowindow
    google.maps.event.addListener(markers[l], "click", function () {
      for (let a = 0; a < position.length; a++) {
        infowindows[a].close();
      }
      infowindows[l].close();
      infowindows[l].setContent(
        `<h1 id="infowindowsTitle">${position[l].label}</h1>` +
          `<img id="windowPic" src="${position[l].image}" alt="${position[l].label}街景">` +
          `至<a href="${position[l].googleMapUrl}" target='_blank'>Google Map</a>上查看更多`
      );
      walkingLocation.value = position[l].label;
      infowindows[l].open(map, markers[l]);
    });

    // Selector value change map ,infowindow change
    walkingLocation.addEventListener("change", function () {
      if (walkingLocation.value === position[l].label) {
        for (let a = 0; a < position.length; a++) {
          infowindows[a].close();
        }
        infowindows[l].close();
        infowindows[l].setContent(
          `<h1 id="infowindowsTitle">${position[l].label}</h1>` +
            `<img id="windowPic" src="${position[l].image}" alt="${position[l].label}街景">` +
            `至<a  href="${position[l].googleMapUrl}" target='_blank'>Google Map</a>上查看更多`
        );
        infowindows[l].open(map, markers[l]);
      }
    });
  }

  function addinfowindow(i) {
    infowindows[i] = new google.maps.InfoWindow({
      position: {
        lat: position[i].lat,
        lng: position[i].lng,
      },

      maxWidth: 450,
      pixelOffset: new google.maps.Size(0, 3),
    });
  }

  function addMarker(n) {
    markers[n] = new google.maps.Marker({
      map: map,

      position: {
        lat: position[n].lat,
        lng: position[n].lng,
      },

      label: {
        text: position[n].label,
        fontSize: "14px",
        fontWeight: "450",
      },

      icon: {
        labelOrigin: { x: 15, y: -14 },
        url: "/img/pawlabel.png",
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
      },
    });
  }
}

initMap();
