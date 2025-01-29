/*Cadastrando informações no banco */

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
    //Mesmo nao tendo o campo estou vinculando o meu salvamento no banco com o usuario que estou logado
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
        uid: doc.id, //Aqui estou pegando o id gerado automatico pelo fire e as infos daqui
      }));

      tabelinha(tableClient);
    });
  updatetable();
};

//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//Trazer as informações de forma automatica do banco assim que entrar na página ou dar f5

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

//Trazer as informações de forma automatica do banco assim que entrar na página ou dar f5

//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

//------------------------------------------------------
//------------------------------------------------------
//Arrumando tabela, limpar dados duplicados tabela

//Para não cadastrar mais de um e quando voltar a informação nao volta mais de duas tambem
//lembrando que nao tem nada ver com o cadastrar, cadastrar já está correto, ele cadastra apenas
//uma vez no meu banco, porem na parte de front, para mostrar na tela ele mostra como se
//tivesse cadastrado dois, então ele cadatsra dois e retorna dois, para tirar isso basta
//criar o clearTable e o updatetable
const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody td");
  const del = document.querySelectorAll("#tableClient>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
  del.forEach((row) => row.parentNode.removeChild(row)); //
};

const updatetable = () => {
  const dbClient = readClient();
  //Depois que atualizar limpar tabela
  clearTable();
};

document.getElementById("salvar").addEventListener("click", saveClient);
/*Cadastrando informações no banco */

//Arrumando tabela, limpar dados duplicados tabela
//------------------------------------------------------
//---

addEventListener("load", (event) => {
  db.collection("cachorro")
    .get()
    .then((snapshot) => {
      const tableClient = snapshot.docs.map((doc) => ({
        ...doc.data().client,
        uid: doc.id, //Aqui estou pegando o id gerado automatico pelo fire e as infos daqui
      }));

      tabelinha(tableClient);
    });
});

/*Fazer logout quando estiver logado depois de fazer login */

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

/*Fazer logout quando estiver logado depois de fazer login */
