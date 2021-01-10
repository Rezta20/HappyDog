const checkSignInPwdInput = document.querySelector(".checkSignInPwd");
const facebookLoginBtn = document.querySelector(".facebookLogin");
const googleLoginBtn = document.querySelector(".googleLogin");
const logInBtn = document.querySelector(".loginCard-loginButton");
const logInCard = document.querySelector("#logInCard-Mobile");
const logInEmail = document.querySelector("#loginEmail");
const logInPwd = document.querySelector("#loginPwd");
const signUpBtn = document.querySelector(".signinCard-loginButton");
const signInCard = document.querySelector("#signInCard-Mobile");
const signUpEmail = document.querySelector("#signUpemail");
const signUpPwd = document.querySelector("#signUppwd");

function checkLogInData() {
  firebase
    .auth()
    .signInWithEmailAndPassword(logInEmail.value, logInPwd.value)
    .then(() => {
      var user = firebase.auth().currentUser;

      if (user) {
        // 抓資料
        location.href = "/Html/homepage.html";
      } else {
      }
    })
    .catch((err) => {
      if (
        err.message == "The email address is already in use by another account."
      ) {
        Swal.fire({
          title: "這個信箱已辦過帳號囉！",
          icon: "warning",
          confirmButtonText: "確定",
        });
      } else if (
        err.message ==
        "The password is invalid or the user does not have a password."
      ) {
        Swal.fire({
          title: "密碼不正確或未輸入",
          icon: "warning",
          confirmButtonText: "確定",
        });
      } else if (
        err.message == "The password must be 6 characters long or more."
      ) {
        Swal.fire({
          title: "密碼需要為6位數或是更長",
          icon: "warning",
          confirmButtonText: "確定",
        });
      } else if (err.message == "The email address is badly formatted.") {
        Swal.fire({
          title: "信箱格式請輸入XXXX@xxxxx.xxx的格式",
          icon: "warning",
          confirmButtonText: "確定",
        });
      } else if (
        err.message ==
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        Swal.fire({
          title: "帳號未註冊，請先註冊",
          icon: "warning",
          confirmButtonText: "確定",
        });
        changeToSignin();
        logInEmail.value = "";
        logInPwd.value = "";
      }
    });
}

function checkSignUpData(user) {
  if (checkSignInPwdInput.value === user.pwd) {
    // Through auth().createUserWithEmailAndPassword build user
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.pwd)
      .then((u) => {
        Swal.fire({
          title: "已登入",
          icon: "success",
          confirmButtonText: "確定",
        }).then(function () {
          location.href = "../homepage.html";
        });
        // 2秒後清空資料
        setTimeout(function () {
          signUpEmail.value = "";
          signUpPwd.value = "";
        }, 2000);
      })
      .catch((err) => {
        if (
          err.message ==
          "The email address is already in use by another account."
        ) {
          Swal.fire({
            title: "這個信箱已辦過帳號囉！",
            icon: "warning",
            confirmButtonText: "確定",
          });
        } else if (err.message == "Password should be at least 6 characters") {
          Swal.fire({
            title: "密碼請至少輸入6位數",
            icon: "warning",
            confirmButtonText: "確定",
          });
        } else if (
          err.message == "The password must be 6 characters long or more."
        ) {
          Swal.fire({
            title: "密碼需要為6位數或是更長",
            icon: "warning",
            confirmButtonText: "確定",
          });
        } else if (err.message == "The email address is badly formatted.") {
          Swal.fire({
            title: "信箱格式請輸入XXXX@xxxxx.xxx的格式",
            icon: "warning",
            confirmButtonText: "確定",
          });
        }
      });
  } else if (checkSignInPwdInput.value !== user.pwd) {
    Swal.fire({
      title: "確認密碼與密碼不符，請重新輸入",
      icon: "warning",
      confirmButtonText: "確定",
    });
    checkSignInPwdInput.value = "";
  }
}

function changeToLogin() {
  logInCard.style.left = "0";
  logInCard.style.opacity = "1";
  signInCard.style.left = "100%";
  signInCard.style.opacity = "0";
}

function changeToSignin() {
  logInCard.style.left = "-100%";
  logInCard.style.opacity = "0";
  signInCard.style.left = "0";
  signInCard.style.opacity = "1";
}

// Click sign up button event
signUpBtn.addEventListener("click", () => {
  let user = {
    email: signUpEmail.value,
    pwd: signUpPwd.value,
  };
  checkSignUpData(user);
});

// Firebase log In
logInBtn.addEventListener("click", (event) => {
  event.preventDefault();
  checkLogInData();
});

// FB Login In
function fbLogin() {
  const provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      location.href = "/Html/homepage.html";
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
}
facebookLoginBtn.addEventListener("click", fbLogin);

// Google Log in
function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      location.href = "/Html/homepage.html";
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
}
googleLoginBtn.addEventListener("click", googleLogin);
