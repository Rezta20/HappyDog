const alertCheckBtn = document.querySelector(".swal2-confirm");
const email = document.querySelector(".email");
const logoutBtn = document.querySelector("#logoutBtn");
const userId = document.querySelector(".userId");
const userImg = document.querySelector(".userImg");
const userNativePhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/happydog-82c2f.appspot.com/o/logo%2FlogoNative1.png?alt=media&token=682b9c60-f667-471c-9169-fd69f36a9f21";

function firebaseSignOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful

      Swal.fire({
        title: "已登出",
        icon: "success",
        confirmButtonText: "確定",
      }).then(function () {
        location.href = "../../Html/homepage.html";
      });
    })
    .catch(function (error) {
      // An error happened.
      Swal.fire({
        title: "登出錯誤",
        icon: "warning",
        confirmButtonText: "確定",
      });
    });
}

function firebaseUserState() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const providerData = user.providerData[0];
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
      //Do nothing
    }
  });
}

// Firebase Log out
logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  firebaseSignOut();
});

// Firebase 監聽
window.addEventListener("load", function () {
  firebaseUserState();
});
