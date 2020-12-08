// Firebase Log out
const logoutBtn = document.querySelector("#logoutBtn");
logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  firebase.auth().signOut();
  sessionStorage.removeItem("user");
  console.log("User signed out!");
});
