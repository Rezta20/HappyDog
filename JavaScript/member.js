const userId = document.querySelector(".userId");
const userImg = document.querySelector(".userImg");
const email = document.querySelector(".email");

const currentUser = firebase.auth().currentUser;

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
      console.log("User signed out!");
      alert("登出成功");
      location.href = "../../Html/homepage.html";
    })
    .catch(function (error) {
      // An error happened.
      console.log("Signed out! Error");
      alert("登出失敗");
    });
});

// Firebase 監聽
window.addEventListener("load", function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const providerData = user.providerData[0];
      userId.innerHTML = `會員姓名：${providerData.displayName}`;
      email.innerHTML = `會員帳號：${providerData.email}`;
      userImg.style.backgroundImage = `url(${providerData.photoURL})`;
      console.log(providerData);
    } else {
    }
  });
});
