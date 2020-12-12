const notLoginState = document.querySelector(".notLoginState");
const loginState = document.querySelector(".loginState");

if (sessionStorage.getItem("user") === null) {
  loginState.style.display = "none";
  notLoginState.style.display = "flex";
} else {
  loginState.style.display = "flex";
  notLoginState.style.display = "none";
}
