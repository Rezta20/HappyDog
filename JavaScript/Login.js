// ForMobile
const logInCard = document.querySelector("#logInCard-Mobile");
const signInCard = document.querySelector("#signInCard-Mobile");

function changeToSignin() {
  logInCard.style.left = "-100%";
  signInCard.style.left = "0";
  logInCard.style.opacity = "0";
  signInCard.style.opacity = "1";
}

function changeToLogin() {
  logInCard.style.left = "0";
  signInCard.style.left = "100%";
  signInCard.style.opacity = "0";
  logInCard.style.opacity = "1";
}
