//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
/*Conexão e if de usuario */
const firebaseConfig = {
  apiKey: "AIzaSyA_XT84Ebukm9-Y5cjtuEJEztdg5qW_-Cg",
  authDomain: "agoravai-218c6.firebaseapp.com",
  projectId: "agoravai-218c6",
  storageBucket: "agoravai-218c6.appspot.com",
  messagingSenderId: "975390263643",
  appId: "1:975390263643:web:48584a10445fd54007727e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

/*Só usuario logados que podem ter acesso a determinadas paginas, como nao estou logado
  não tenho acesso e sou direcionado para a pagina de login */
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
  firebaseUser = user;
  const usuarioFirebase = user.email;
  usuarioLogado = document.querySelector(".nomeUsuarioLogado");
  usuarioLogado.innerHTML = usuarioFirebase;
});
/*Só usuario logados que podem ter acesso a determinadas paginas */

/*Conexão e if de usuario */
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------

/*Cadastrando informações no banco */

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
        uid: doc.id, //Aqui estou pegando o id gerado automatico pelo fire e as infos daqui
      }));

      //Loga na página inicia com os dados
      tabelinha(tableClient);

      //Pegando as informações do radio quando eu clicar nele
      const informacoesRadio = document.querySelectorAll(
        ".pegandoInformacoesRadio"
      );

      informacoesRadio.forEach(function (data) {
        data.addEventListener("click", function () {
          //tras  ainformações do meu value do radio quando eu seleciono oq eu quero ou seja ele
          //tras as informações do que eu selecionei, vou deixar ocmentado
          // console.log(data.value);

          //transofrmando os dados que estão no value do radio quando eu seleciono o que eu quero
          //em array

          console.log(data);

          //Quando eu clicar no radio tbm aparecer minha tabela, pois deixei no style como none

          tableServ.style.display = "table";
          //Quando eu clicar no radio tbm aparecer minha tabela, pois deixei no style como none
          const array = data.value.split(" ");
          console.log(array);

          const nomeee = array[2];

          console.log(nomeee);

          const tabelaServico = (tableServ) => {
            const tab = document.getElementById("tableServ");

            //Como abaixo quero retornar apenas um item e nao todos, e sim só o que eu selecionei
            //eu vou tirar o forEach vou deixar ele comentado abaixo para eu lebrar como era
            //quiser mostrar todos só descomentar ele, nao exquecer de descomentar o }) la no fim
            //tableServ.forEach((tableServ) => {
            const tr = document.createElement("tr");
            tr.classList.add(tableServ.type);

            const nome = document.createElement("td");
            nome.innerHTML = array[2];
            // estou setando classes para eu conseguir recuperar a informação e salvar no banco
            //para eu conseguir afzer isso lá na minha função saveServico
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

            //Inserindo input na tabela
            const data = document.createElement("td");
            const dataInput = document.createElement("input");
            tr.appendChild(data);
            dataInput.setAttribute("id", "servicoData");
            data.appendChild(dataInput).placeholder = "DD/mm/YYYY";

            //Inserindo input na tabela
            const hora = document.createElement("td");
            const horaInput = document.createElement("input");
            tr.appendChild(hora);
            horaInput.setAttribute("id", "servicoHora");
            hora.appendChild(horaInput).placeholder = "HH:MM";

            //Inserindo input na tabela
            const button = document.createElement("button");
            button.innerHTML = "Cadastrar";
            //Inserindo classe no meu button criado pelo createElement
            //essa mesma classe do button vou pegar para conseguir executar minha função
            button.setAttribute("class", "buttonCadastrarServico");
            tr.appendChild(button);

            tab.appendChild(tr);
            document.querySelector("#tableServ>tbody").appendChild(tr);

            button.addEventListener("click", saveServico);

            //});
          };
          //Chamando o clearTable para limpar os dados e mostrar apenas uma linha da tabela,
          // quando eu  apertar no radio e não trazer todos
          clearTable();
          tabelaServico(tableClient);
        });
      });
    });
}

pegandoInformacoesRadioSelecionandoPet();

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

/*Quando eu clicar no radio e selecionar o pet

abrir um modal ou tabela para eu cadastrar o serviço*/

/*Quando eu clicar no radio e selecionar o pet

abrir um modal ou tabela para eu cadastrar o serviço*/

/*Fazer logout quando estiver logado depois de fazer login */

/*
Jeito de fazer função com for para pegar em todos os radios os selects e etc



 let varios = document.querySelectorAll('.teste');

      varios.forEach(function(data){
        data.addEventListener('click',function(){
            ativarCadastroHoraData();
        })
      })




            trazer o dado que quer
           console.log(tableClient[1].nome);

*/

//função para trazer apena um  informação na minha table,
// quando eu apertar no radio vai trazer apenas aquela linha que selecionei
//e nao todas.
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
    //como não vou isnerir dados e sim pegar o que já está eu uso o innerHTML
    nome: document.getElementById("servicoNome").innerHTML,
    user: document.getElementById("servicoUser").innerHTML,
    raca: document.getElementById("servicoRaca").innerHTML,

    data: document.getElementById("servicoData").value,
    hora: document.getElementById("servicoHora").value,
    //Mesmo nao tendo o campo estou vinculando o meu salvamento no banco com o usuario que estou logado
  };

  db.collection("servico").add({
    client: client,
  });


  tableServ.style.display = "none";



  //Vou criar uma mensagem, para quando a pessoa apertar no clicar em salvar
  // mostrar uma mensagem que deu certo

  //aqui eu coloco o que quero criar pode ser oq eu quiser div, p , li e etc
  const p = document.createElement("p");
  //Aqui eu crio a mensagem que quero criar
  const mensagemDeCadastroServico = document.createTextNode(
    "Serviço cadastro com sucesso"
  );


  //Aqui eu faço a atribuação dos dois acima
  p.appendChild(mensagemDeCadastroServico);

  //já aqui, eu escolho onde vai ficar o texto, vejo onde tem um elemento na página
  //e depois escolho  lembrando que é before eae faço a inserção igual a baixo
  const afterTabela = document.querySelector("footer");
  //inserindo uma classe nele para gente conseguir editar
  p.setAttribute('class', 'mensagemDeCadastroServico');
  document.body.insertBefore(p, afterTabela);



  
};
