const signUpBtn = document.querySelector(".signinCard-loginButton");
const signUpEmail = document.querySelector("#signUpemail");
const signUpPwd = document.querySelector("#signUppwd");

const logInBtn = document.querySelector(".loginCard-loginButton");
const logInEmail = document.querySelector("#loginEmail");
const logInPwd = document.querySelector("#loginPwd");

const checkSignInPwdInput = document.querySelector(".checkSignInPwd");

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

// 綁定註冊按鈕的點擊事件
signUpBtn.addEventListener("click", () => {
  let user = {
    email: signUpEmail.value,
    pwd: signUpPwd.value,
  };

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
        console.log(err.message);
      });
  } else if (checkSignInPwdInput.value !== user.pwd) {
    Swal.fire({
      title: "確認密碼與密碼不符，請重新輸入",
      icon: "warning",
      confirmButtonText: "確定",
    });
    checkSignInPwdInput.value = "";
  }
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
});

// FB Login In
document.querySelector(".facebookLogin").addEventListener("click", fbLogin);

function fbLogin() {
  const provider = new firebase.auth.FacebookAuthProvider();
  // provider.setCustomParameters({
  //   display: "popup",
  // });

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      location.href = "/Html/homepage.html";
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

// Google Log in
document.querySelector(".googleLogin").addEventListener("click", googleLogin);

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      location.href = "/Html/homepage.html";
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}
