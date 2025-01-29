//Mudar página pelo button
const bntCadastrarLogin = document.querySelector('.bntCadastrarLogin');
const btnLogin = document.querySelector('.btnLogin');

function direcionarParaCadastrarLogin(){
    console.log('ativou');
    window.location.href = 'cadastrarLogin.html';
}

function direcionarParaFazerLogin(){
    console.log('ativou');
    window.location.href = 'login.html';
}

bntCadastrarLogin.addEventListener('click', direcionarParaCadastrarLogin);
btnLogin.addEventListener('click', direcionarParaFazerLogin);