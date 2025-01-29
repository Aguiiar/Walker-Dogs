async function cadastrar() {
  const client = {
    usuario: document.getElementById("criacaoUsuario").value,
    senha: document.getElementById("criacaoSenha").value,
    senha1: document.getElementById("criacaoSenhaConfirmacao").value,

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
  } catch (error) {
    console.log(error);
  }
}
