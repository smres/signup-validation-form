const usernameInput = document.querySelector(".user-input");
const passwordInput = document.querySelector(".pass-input");
const repeatPasswordInput = document.querySelector(".repeat-pass-input");
const usernameMsg = document.querySelector(".username-msg");
const passwordMsg = document.querySelector(".password-msg");
const repeatPasswordMsg = document.querySelector(".repeat-password-msg");
let signinMsg = document.querySelector(".signin-status");
const signinBtn = document.querySelector(".signin-button");
const eyeStatus = document.querySelector(".eye-status");
const repeatEyeStatus = document.querySelector(".repeat-eye-status");

signinBtn.addEventListener("click", signIn);

function signIn(event) {
  event.preventDefault();
  usernameMsg.innerText = "";
  passwordMsg.innerText = "";
  repeatPasswordMsg.innerText = "";
  const userNameValue = usernameInput.value;
  const passwordValue = passwordInput.value;
  const repeatPasswordValue = repeatPasswordInput.value;
  let ifSendData = true;

  if (
    (userNameValue.indexOf("@") === -1 || userNameValue.indexOf(".") === -1) &&
    userNameValue.length !== 0
  ) {
    usernameMsg.innerText = "Email is not Valid.";
    ifSendData = false;
  } else if (userNameValue.length === 0) {
    usernameMsg.innerText = "Please enter a valid Email.";
    ifSendData = false;
  }

  if (passwordValue.length <= 4 && passwordValue.length !== 0) {
    passwordMsg.innerText = "Password can't less than 5 character.";
    ifSendData = false;
  } else if (passwordValue.length === 0) {
    passwordMsg.innerText = "Please enter your password.";
    ifSendData = false;
  }

  if (repeatPasswordValue.length <= 4 && repeatPasswordValue.length !== 0) {
    repeatPasswordMsg.innerText = "Password can't less than 5 character.";
    ifSendData = false;
  } else if (repeatPasswordValue.length === 0) {
    repeatPasswordMsg.innerText = "Please enter your confirm password.";
    ifSendData = false;
  }

  if (repeatPasswordValue !== passwordValue) {
    repeatPasswordMsg.innerText = "Password is not same.";
    ifSendData = false;
  }

  if (ifSendData) {
    const body = JSON.stringify({
      usename: userNameValue,
      password: passwordValue,
    });
    const headers = { "content-type": "application/json" };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: body,
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        signinMsg.innerText = "You Signed in Successfully";
      }
    });
  }
}

let isEyeHide1 = true;
let isEyeHide2 = true;
function showHidePassword(mode) {
  if (passwordInput.value.length !== 0) {
    if (mode === "1") {
      if (isEyeHide1) {
        passwordInput.type = "text";
        eyeStatus.src = "./close-eye.svg";
        isEyeHide1 = false;
      } else {
        passwordInput.type = "password";
        eyeStatus.src = "./open-eye.svg";
        isEyeHide1 = true;
      }
    } else if (mode === "2") {
      if (isEyeHide2) {
        repeatPasswordInput.type = "text";
        repeatEyeStatus.src = "./close-eye.svg";
        isEyeHide2 = false;
      } else {
        repeatPasswordInput.type = "password";
        repeatEyeStatus.src = "./open-eye.svg";
        isEyeHide2 = true;
      }
    }
  }
}

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length === 0) {
    isEyeHide1 = true
    passwordInput.type = "password";
    eyeStatus.src = "./open-eye.svg";
  }
});

repeatPasswordInput.addEventListener("input", () => {
  if (repeatPasswordInput.value.length === 0) {
    isEyeHide2 = true
    repeatPasswordInput.type = "password";
    repeatEyeStatus.src = "./open-eye.svg";
  }
});
