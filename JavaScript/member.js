const userId = document.querySelector(".userId");
const userImg = document.querySelector(".userImg");
const email = document.querySelector(".email");
const userNativePhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/logo%2FIMG_4239.jpg?alt=media&token=33dc36bb-f405-4aef-82ef-184516be4190";

const alertCheckBtn = document.querySelector(".swal2-confirm");

// content.innerHTML =
// Firebase Log out
const logoutBtn = document.querySelector("#logoutBtn");
logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();

  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      sessionStorage.removeItem("user");

      Swal.fire({
        title: "已登出",
        icon: "success",
        confirmButtonText: "確定",
      });

      // alertCheckBtn.onclick = function () {
      //   location.href = "../../Html/homepage.html";
      // };

      // setTimeout(function () {
      //   alertCheckBtn.onclick = function () {
      //     location.href = "../../Html/homepage.html";
      //   };
      // }, 2000);

      location.href = "../../Html/homepage.html";
    })
    .catch(function (error) {
      // An error happened.
      console.log("Signed out! Error");
      Swal.fire({
        title: "登出錯誤",
        icon: "warning",
        confirmButtonText: "確定",
      });
    });
});

// Firebase 監聽
window.addEventListener("load", function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const providerData = user.providerData[0];
      console.log(providerData);

      if (
        providerData.providerId === "google.com" ||
        providerData.providerId === "facebook.com"
      ) {
        userId.innerHTML = `會員姓名：${providerData.displayName}`;
        email.innerHTML = `會員帳號：${providerData.email}`;
        userImg.style.backgroundImage = `url(${providerData.photoURL})`;
      } else {
        userId.remove();
        email.innerHTML = `會員帳號：${providerData.email}`;
        userImg.style.backgroundImage = `url(${userNativePhotoUrl})`;
      }
    } else {
    }
  });
});
