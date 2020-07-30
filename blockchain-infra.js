var contaAtual;
var provedor;
var provedorDeSignatarios;
var signatario;
var contratoComSignatario;
var contratoSemSignatario;

function inicio() {
 
  provedor = ethers.getDefaultProvider("rinkeby");
  
  contratoSemSignatario = new ethers.Contract(enderecoContrato, abiContrato, provedor);
  buscarDadosDoContratoInteligente(contratoSemSignatario);
}

function conectaAoMetamask() {
  event.preventDefault();
  console.log("conectaAoMetamask chamado");
  if (typeof window.ethereum === "undefined") {
    alert("Por favor instale o MetaMask em metamask.io");
    return;
  } else {
    requisitaAcessoAContas();
  }
}

function requisitaAcessoAContas() {
  ethereum
    .send("eth_requestAccounts")
    .then(gerenciaTrocaDeSelecaoDeContas)
    .catch((err) => {
      if (err.code === 4001) {
        console.log("Por favor, dê permissão a este site no seu Metamask.");
      } else {
        console.error(err);
      }
    });
  ethereum.on("accountsChanged", gerenciaTrocaDeSelecaoDeContas);
}

function gerenciaTrocaDeSelecaoDeContas(_contas) {
  if (typeof provedorDeSignatarios === "undefined") {
    provedorDeSignatarios = new ethers.providers.Web3Provider(web3.currentProvider);
  }
  var contas;
  if (typeof _contas.result === "undefined") {
    contas = _contas;
  } else {
    contas = _contas.result;
  }
  console.log("gerenciaTrocaDeSelecaoDeEndereco - parametro recebido", contas);
  if (contas.length === 0) {
    alert("Por favor instale o MetaMask em metamask.io ou o autorize a acessar a sua conta");
    return;
  }
  if (contas[0] !== contaAtual) {
    contaAtual = contas[0];
  }
  signatario = provedorDeSignatarios.getSigner();
  contratoComSignatario = new ethers.Contract(enderecoContrato, abiContrato, signatario);
  //buscarDadosDoContratoInteligente(contratoComSignatario);
  $("#btnConectaMetamask").hide();
  $("#areaOpcoesVotacao").show();
  estaAptoAVotar(contaAtual, contratoComSignatario);
}

function buscarDadosDoContratoInteligente(_contrato) {
  if (typeof _contrato === "undefined") {
    _contrato = contratoSemSignatario;
  }
  _contrato
    .materia()
    .then((resultado) => {
      console.log("O conteudo retornado foi ", resultado);
      $("#materiaDeVotacao").html(resultado);
    })
    .catch((err) => {
      console.error("Houve um erro ", err);
    });
  _contrato
    .chapa1()
    .then((resultado) => {
      console.log("O conteudo retornado foi ", resultado);
      $("#membrosChapa1").html(resultado);
      $("#btnChapa1").html(resultado);
    })
    .catch((err) => {
      console.error("Houve um erro ", err);
    });
  _contrato
    .votosChapa1()
    .then((resultado) => {
      console.log("O conteudo retornado foi ", resultado.toNumber());
      $("#exibicaoVotosChapa1").html(resultado.toNumber());
    })
    .catch((err) => {
      console.error("Houve um erro ", err);
    });
  _contrato
    .chapa2()
    .then((resultado) => {
      console.log("O conteudo retornado foi ", resultado);
      $("#membrosChapa2").html(resultado);
      $("#btnChapa2").html(resultado);
    })
    .catch((err) => {
      console.error("Houve um erro ", err);
    });
  _contrato
    .votosChapa2()
    .then((resultado) => {
      console.log("O conteudo retornado foi ", resultado.toNumber());
      $("#exibicaoVotosChapa2").html(resultado.toNumber());
    })
    .catch((err) => {
      console.error("Houve um erro ", err);
    });
  $("#informacoes").show();
  $("#votacao").show();
  $("#tituloEleicao").show();
}

function estaAptoAVotar(_address, _contrato) {
  _contrato
    .advogados(_address)
    .then((resultado) => {
      console.log("O conteudo retornado foi ", resultado);
      //lembre-se que (resultado) é igual a (resultado == true)
      if (resultado) {
        $("#descricaoAptidaoVotacao").html("Escolha abaixo a Chapa que deseja eleger para a Direção da OAB Subseção BlockCity em 2020");
        $("#btnChapa1").prop("disabled", false);
        $("#btnChapa2").prop("disabled", false);
      } else {
        //Busca o endereco do secretario para informar o eleitor
        _contrato
          .secretario()
          .then((resultado) => {
            console.log("O conteudo retornado foi ", resultado);
            $("#descricaoAptidaoVotacao").html("Você não esta apto a votar. Entre em contato com o servidor da Subseção de BlockCity. O endereço Ethereum do mesmo é: " + resultado);
          })
          .catch((err) => {
            console.error("Houve um erro ", err);
          });
      }
    })
    .catch((err) => {
      console.error("Houve um erro ", err);
    });
}

function enviaVoto(_opcaoDesejada) {
  $("#descricaoStatusTransacoes").html("Transação enviada. Aguarde pela mineração...");
  $("#statusTransacoes").show();
  contratoComSignatario
    .votar(_opcaoDesejada)
    .then((transacao) => {
      transacao
        .wait()
        .then((resultado) => {
          console.log("enviaVoto - o resultado foi ", resultado);
          if (resultado.status === 1) {
            $("#descricaoStatusTransacoes").html("Voto computado. Obrigado.");
            $("#btnChapa1").prop("disabled", true);
            $("#btnChapa2").prop("disabled", true);
          } else {
            $("#descricaoStatusTransacoes").html("Houve um erro no voto: " + resultado);
          }
        })
        .catch((err) => {
          console.error("enviaVoto - a transação foi minerada e houve um erro. Veja abaixo");
          console.error(err);
          $("#descricaoStatusTransacoes").html("Algo saiu errado: " + err.message);
        });
    })
    .catch((err) => {
      console.error("enviaVoto - tx só foi enviada");
      console.error(err);
      $("#descricaoStatusTransacoes").html("Algo saiu errado antes de enviar ao Ethereum: " + err.message);
    });
}