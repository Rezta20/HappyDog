const notLoginState = document.querySelector(".notLoginState");
const loginState = document.querySelector(".loginState");

// Firebase 監聽
window.addEventListener("load", function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("sign in");
      console.log(user);
      console.log(user.email);
      loginState.style.display = "flex";
      notLoginState.style.display = "none";
    } else {
      console.log("user is sign out");
      console.log(user);
      loginState.style.display = "none";
      notLoginState.style.display = "flex";
    }
  });
});
