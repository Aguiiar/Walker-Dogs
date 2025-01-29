const firebaseConfig = {
  apiKey: "AIzaSyA_XT84Ebukm9-Y5cjtuEJEztdg5qW_-Cg",
  authDomain: "agoravai-218c6.firebaseapp.com",
  projectId: "agoravai-218c6",
  storageBucket: "agoravai-218c6.appspot.com",
  messagingSenderId: "975390263643",
  appId: "1:975390263643:web:48584a10445fd54007727e",
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
  
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const uid = user.uid;
        const teste = user.email;
        const teste2 = doc.data().client.tipo;
        console.log(uid);
        console.log(teste);
        console.log(teste2);

        if (user && teste2 === "passeador") {
          console.log("foi");
          window.location.href = "telaAdminPasseador.html";
        } else {
          window.location.href = "cadastrar.html";
        }
      });
  }
});


function onChangeEmail() {
  toggleButtonsDisable();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonsDisable();
  togglePasswordErrors();
}

function isEmailValid() {
  const email = document.getElementById("email").value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}


function toggleEmailErrors() {
  const email = document.getElementById("email").value;
  if (!email) {
    document.getElementById("email-required-error").style.display = "block";
  } else {
    document.getElementById("email-required-error").style.display = "none";
  }

  if (validateEmail(email)) {
    document.getElementById("email-invalid-error").style.display = "none";
  } else {
    document.getElementById("email-invalid-error").style.display = "block";
  }
}

function toggleButtonsDisable() {
  
  const emailValid = isEmailValid();
  document.getElementById("recover-password-button").disabled = !emailValid;

  
  const passwordValid = isPasswordValid();
  document.getElementById("login-button").disabled =
    !emailValid || !passwordValid;
}

function togglePasswordErrors() {
  const password = document.getElementById("password").value;
  if (!password) {
    document.getElementById("password-required-error").style.display = "block";
  } else {
    document.getElementById("password-required-error").style.display = "none";
  }
}



function isPasswordValid() {
  const password = document.getElementById("password").value;
  if (!password) {
    return false;
  }
  return true;
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function login() {
  showLoading();

  firebase
    .auth()
    .signInWithEmailAndPassword(
      document.getElementById("email").value,
      document.getElementById("password").value
    )
    .then((response) => {
      hideLoading();

    })
    .catch((error) => {
      hideLoading();
      console.log("error", error);
      alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
  if (error.code == "auth/invalid-credential") {
    return "Usuário ou senha inválida";
  }

  return error.message;
}

function recoverPassword() {
  showLoading();
  firebase
    .auth()
    .sendPasswordResetEmail(document.getElementById("email").value)
    .then(() => {
      hideLoading();
      alert("Email enviado com sucesso");
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}


function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "login.html";
    })
    .catch(() => {
      alert("Erro ao fazer logout");
    });
}

