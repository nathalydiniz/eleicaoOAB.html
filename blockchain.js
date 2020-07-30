function registroDoAnimal(_registro) {
    event.preventDefault();
    
    if ($("#_nome").val().length < 2) {
      alert("Nome do proprietário inválido");
      $("#_nomeProprietario").focus();
      return;
    }

    if ($("#_especie").val().length < 2) {
      alert("Espécie inválida");
      $("#_especie").focus();
      return;
    }

    if ($("#_sexo").val().length < 2) {
      alert("Sexo inválido");
      $("#_sexo").focus();
      return;
    }

    if (!$("#_criador").val().startsWith("0x")) {
      alert("Endereço inválido");
      $("#_criador").focus();
      return;
    }
  
    if (!$("#_tutor").val().startsWith("0x")) {
      alert("Endereço inválido");
      $("#_tutor").focus();
      return;
    }

    if ($("#_LocalDeNascimento").val().length < 2) {
      alert("Local de nascimento inválido");
      $("#_LocalDeNascimento").focus();
      return;
    }
    
    if (typeof contratoComSignatario === "undefined") {
      alert("Você não está conectado ao Ethereum. Verifique seu Metamask");
      return;
    }
    
      $("#descricaoStatusTransacoes").html("Transação enviada. Aguarde pela mineração...");
      $("#statusTransacoes").show();
    contratoComSignatario
      .registroDoAnimal($(_nome).val(), $(_especie).val(), $(_sexo).val(), $(_criador).val(), $(_tutor).val(), $(_LocalDeNascimento).val(), $(_certificado).val(), ($(_dataDeNascimento).val() * 1))
      .then((transacao) => {
        transacao
          .wait()
          .then((resultado) => {
            console.log("registro - o resultado foi ", resultado);
            if (resultado.status === 1) {
              $("#descricaoStatusTransacoes").html("Pet registrado eternamente");
              $("#btnregistroDoAnimal").prop(true);              
            } else {
              $("#descricaoStatusTransacoes").html("Houve um erro no registro: " + resultado);
            }
          })
          .catch((err) => {
            console.error("registro - a transação foi minerada e houve um erro. Veja abaixo");
            console.error(err);
            $("#descricaoStatusTransacoes").html("Algo saiu errado: " + err.message);
          });
      })
      .catch((err) => {
        console.error("registro - tx só foi enviada");
        console.error(err);
        $("#descricaoStatusTransacoes").html("Algo saiu errado antes de enviar ao Ethereum: " + err.message);
      });
  }