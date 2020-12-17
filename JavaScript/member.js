const content = document.querySelector(".content");

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
