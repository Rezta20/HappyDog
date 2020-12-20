const notLoginState = document.querySelector(".notLoginState");
const loginState = document.querySelector(".loginState");
const userIcon = document.querySelector(".fa-user-circle");
const userPhoto = document.querySelector(".userPhoto");
const userLoginName = document.querySelector(".userLoginName");

// Firebase 監聽
window.addEventListener("load", function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const providerData = user.providerData[0];

      console.log("sign in");
      console.log(user);
      console.log(user.email);
      if (
        providerData.providerId === "google.com" ||
        providerData.providerId === "facebook.com"
      ) {
        console.log("ho");
        console.log(providerData.displayName);
        userIcon.style.display = "none";
        userPhoto.style.display = "inline";
        userPhoto.style.backgroundImage = `url(${providerData.photoURL})`;
        userLoginName.innerHTML = `${providerData.displayName}`;
      }
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
