//Cadastrar Usuario
async function cadastrar() {
  const client = {
    usuario: document.getElementById("criacaoUsuario").value,
    senha: document.getElementById("criacaoSenha").value,
    senha1: document.getElementById("criacaoSenhaConfirmacao").value,

    //Pegando as in
    tipo: document.querySelector("input[name='tipo']:checked").value,
  };

  try {
    const newUser = await this.firebase
      .auth()
      .createUserWithEmailAndPassword(client.usuario, client.senha);
    db.collection("users").doc(newUser.user.uid).set({
      client: client,
    });
    console.log(newUser);

    //Fiz esse setTimeout, para dar tempo para cadastrar no firebaseStore, pois se nao coloco
    //vai muito rapido e só cadastra no autetication do banco
    /* setTimeout(() => {
      window.location.href = "cadastrar.html";
    }, 1000);*/
  } catch (error) {
    console.log(error);
  }
}

