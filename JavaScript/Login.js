const signUpBtn = document.querySelector(".signinCard-loginButton");
const signUpEmail = document.querySelector("#signUpemail");
const signUpPwd = document.querySelector("#signUppwd");

const logInBtn = document.querySelector(".loginCard-loginButton");
const logInEmail = document.querySelector("#loginEmail");
const logInPwd = document.querySelector("#loginPwd");

// Change the Card Movement
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

// FireStore Set up
// firebase.initializeApp({
//   apiKey: "apiKey",
//   projectId: "happydog-82c2f",
//   authDomain: "happydog-82c2f.firebaseapp.com",
//   databaseURL: "https://happydog-82c2f.firebaseio.com/",
// });

// firebase.initializeApp(config);

// Firebase Sign Up
// 綁定註冊按鈕的點擊事件
signUpBtn.addEventListener("click", () => {
  let user = {
    email: signUpemail.value,
    pwd: signUppwd.value,
  };

  // Through auth().createUserWithEmailAndPassword build user
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.pwd)
    .then((u) => {
      alert("帳號註冊成功！");
      changeToLogin();
      setTimeout(function () {
        signUpEmail.value = "";
        signUpPwd.value = "";
      }, 2000);
    })
    .catch((err) => {
      if (
        err.message == "The email address is already in use by another account."
      ) {
        alert("這個信箱已辦過帳號囉！");
      } else if (err.message == "Password should be at least 6 characters") {
        alert("密碼請至少輸入6位數");
      } else if (
        err.message == "The password must be 6 characters long or more."
      ) {
        alert("密碼需要為6位數或是更長");
      } else if (err.message == "The email address is badly formatted.") {
        alert("信箱格式請輸入XXXX@xxxxx.xxx的格式");
      }
      console.log(err.message);
    });
});

// Firebase Log In
logInBtn.addEventListener("click", (event) => {
  event.preventDefault();

  firebase
    .auth()
    .signInWithEmailAndPassword(logInEmail.value, logInPwd.value)
    .then(() => {
      var user = firebase.auth().currentUser;

      if (user) {
        // 抓資料
        console.log("user is signed in");
        console.log(user);
        console.log(user.uid);
        sessionStorage.setItem("user", JSON.stringify(user.uid));
        location.href = "/Html/homepage.html";
      } else {
        console.log("no user is signed in");
      }
    })
    .catch((err) => {
      console.log(err.message);
      if (
        err.message == "The email address is already in use by another account."
      ) {
        alert("這個信箱已辦過帳號囉！");
      } else if (
        err.message ==
        "The password is invalid or the user does not have a password."
      ) {
        alert("密碼不正確或未輸入，請再輸入其他密碼");
      } else if (
        err.message == "The password must be 6 characters long or more."
      ) {
        alert("密碼需要為6位數或是更長");
      } else if (err.message == "The email address is badly formatted.") {
        alert("信箱格式請輸入XXXX@xxxxx.xxx的格式");
      }
    });
});

// // Firebase Log In 監聽
// window.addEventListener("load", function () {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log("sign in");
//       console.log(user);
//     } else {
//       console.log("user is sign out");
//       console.log(user);
//     }
//   });
// });

// FB Login In
// const provider = new firebase.auth.FacebookAuthProvider();
// provider.setCustomParameters({
//   display: "popup",
// });

// firebase
//   .auth()
//   .signInWithPopup(provider)
//   .then(function (result) {
//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   })
//   .catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });

// firebase.auth().signInWithRedirect(provider);
// firebase
//   .auth()
//   .getRedirectResult()
//   .then(function (result) {
//     if (result.credential) {
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       var token = result.credential.accessToken;
//       // ...
//     }
//     // The signed-in user info.
//     var user = result.user;
//   })
//   .catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });
