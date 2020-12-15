const content = document.querySelector(".content");

// Firebase Log out
const logoutBtn = document.querySelector("#logoutBtn");
logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  firebase.auth().signOut();
  sessionStorage.removeItem("user");
  console.log("User signed out!");
  alert("登出成功");
  location.href = "../../Html/homepage.html";
});

// Firebase 監聽
// window.addEventListener("load", function () {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log("sign in");
//       console.log(user);
//       console.log(user.email);
//       content.innerHTML = `會員資料： ${user.email}`;
//     } else {
//       console.log("user is sign out");
//       console.log(user);
//     }
//   });
// });
