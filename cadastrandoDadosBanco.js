

"use strict";
const readClient = () => getLocalStorage();

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? [];
const setLocalStorage = (db_client) =>
  localStorage.setItem("db_client", JSON.stringify(db_client));

const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const saveClient = () => {
  console.log("funcionou");
  const client = {
    nome: document.getElementById("nome").value,
    raca: document.getElementById("raca").value,

    cor: document.getElementById("cor").value,

    idade: document.getElementById("idade").value,

    user: {
      uid: firebase.auth().currentUser.email,
    },
  };

  db.collection("cachorro").add({
    client: client,
  });
  db.collection("cachorro")
    .get()
    .then((snapshot) => {
      const tableClient = snapshot.docs.map((doc) => ({
        ...doc.data().client,
        uid: doc.id, 
      }));

      tabelinha(tableClient);
    });
  updatetable();
};



const tabelinha = (tableClient) => {
  const tab = document.getElementById("tableClient");

  tableClient.forEach((tableClient) => {
    const tr = document.createElement("tr");
    tr.classList.add(tableClient.type);

    const nome = document.createElement("td");
    nome.innerHTML = tableClient.nome;
    tr.appendChild(nome);

    const raca = document.createElement("td");
    raca.innerHTML = tableClient.raca;
    tr.appendChild(raca);

    const cor = document.createElement("td");
    cor.innerHTML = tableClient.cor;
    tr.appendChild(cor);

    const idade = document.createElement("td");
    idade.innerHTML = tableClient.idade;
    tr.appendChild(idade);

    const user = document.createElement("td");
    user.innerHTML = tableClient.user.uid;
    tr.appendChild(user);

    tab.appendChild(tr);
    document.querySelector("#tableClient>tbody").appendChild(tr);
  });
};


const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody td");
  const del = document.querySelectorAll("#tableClient>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
  del.forEach((row) => row.parentNode.removeChild(row)); //
};

const updatetable = () => {
  const dbClient = readClient();
  clearTable();
};

document.getElementById("salvar").addEventListener("click", saveClient);




addEventListener("load", (event) => {
  db.collection("cachorro")
    .get()
    .then((snapshot) => {
      const tableClient = snapshot.docs.map((doc) => ({
        ...doc.data().client,
        uid: doc.id, 
      }));

      tabelinha(tableClient);
    });
});



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


