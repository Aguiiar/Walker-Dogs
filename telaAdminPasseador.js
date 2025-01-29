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

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
  firebaseUser = user;
  const usuarioFirebase = user.email;
  usuarioLogado = document.querySelector(".nomeUsuarioLogado");
  usuarioLogado.innerHTML = usuarioFirebase;
});

("use strict");
const readClient = () => getLocalStorage();

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? [];
const setLocalStorage = (db_client) =>
  localStorage.setItem("db_client", JSON.stringify(db_client));

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

    const selecionado = document.createElement("td");
    selecionado.innerHTML = `
    <input
                class="pegandoInformacoesRadio"
                  type="radio"
                  id="selecionadoRadio"
                  name="escolha"
                  value="${
                    tableClient.cor +
                    " " +
                    tableClient.idade +
                    " " +
                    tableClient.nome +
                    " " +
                    tableClient.raca +
                    " " +
                    tableClient.user.uid
                  }"
                />
Selecionar


             
              
             
          `;
    tr.appendChild(selecionado);

    tab.appendChild(tr);
    document.querySelector("#tableClient>tbody").appendChild(tr);
  });
};

const tableServ = document.getElementById("tableServ");

function pegandoInformacoesRadioSelecionandoPet() {
  db.collection("cachorro")
    .get()
    .then((snapshot) => {
      const tableClient = snapshot.docs.map((doc) => ({
        ...doc.data().client,
        uid: doc.id,
      }));

      tabelinha(tableClient);

      const informacoesRadio = document.querySelectorAll(
        ".pegandoInformacoesRadio"
      );

      informacoesRadio.forEach(function (data) {
        data.addEventListener("click", function () {
          console.log(data);

          tableServ.style.display = "table";

          const array = data.value.split(" ");
          console.log(array);

          const nomeee = array[2];

          console.log(nomeee);

          const tabelaServico = (tableServ) => {
            const tab = document.getElementById("tableServ");

            const tr = document.createElement("tr");
            tr.classList.add(tableServ.type);

            const nome = document.createElement("td");
            nome.innerHTML = array[2];

            nome.setAttribute("id", "servicoNome");
            tr.appendChild(nome);

            const user = document.createElement("td");
            user.innerHTML = array[4];
            user.setAttribute("id", "servicoUser");
            tr.appendChild(user);

            const raca = document.createElement("td");
            raca.innerHTML = array[3];
            raca.setAttribute("id", "servicoRaca");
            tr.appendChild(raca);

            const data = document.createElement("td");
            const dataInput = document.createElement("input");
            tr.appendChild(data);
            dataInput.setAttribute("id", "servicoData");
            data.appendChild(dataInput).placeholder = "DD/mm/YYYY";

            const hora = document.createElement("td");
            const horaInput = document.createElement("input");
            tr.appendChild(hora);
            horaInput.setAttribute("id", "servicoHora");
            hora.appendChild(horaInput).placeholder = "HH:MM";

            const button = document.createElement("button");
            button.innerHTML = "Cadastrar";

            button.setAttribute("class", "buttonCadastrarServico");
            tr.appendChild(button);

            tab.appendChild(tr);
            document.querySelector("#tableServ>tbody").appendChild(tr);

            button.addEventListener("click", saveServico);
          };

          clearTable();
          tabelaServico(tableClient);
        });
      });
    });
}

pegandoInformacoesRadioSelecionandoPet();

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

const clearTable = () => {
  const rows = document.querySelectorAll("#tableServ>tbody td");
  const del = document.querySelectorAll("#tableServ>tbody tr");

  rows.forEach((row) => row.parentNode.removeChild(row));
  del.forEach((row) => row.parentNode.removeChild(row));
  console.log(rows);
  console.log(del);
};

const saveServico = () => {
  console.log("funcionou");
  const client = {
    nome: document.getElementById("servicoNome").innerHTML,
    user: document.getElementById("servicoUser").innerHTML,
    raca: document.getElementById("servicoRaca").innerHTML,

    data: document.getElementById("servicoData").value,
    hora: document.getElementById("servicoHora").value,
  };

  db.collection("servico").add({
    client: client,
  });

  tableServ.style.display = "none";

  const p = document.createElement("p");

  const mensagemDeCadastroServico = document.createTextNode(
    "Serviço cadastro com sucesso"
  );

  p.appendChild(mensagemDeCadastroServico);

  const afterTabela = document.querySelector("footer");
  p.setAttribute("class", "mensagemDeCadastroServico");
  document.body.insertBefore(p, afterTabela);
};
