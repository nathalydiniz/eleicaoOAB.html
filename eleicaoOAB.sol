/*
SPDX-License-Identifier: CC-BY-4.0
Projeto de eleicao da Diretoria da OAB na Subseção de BlockCity do estado de LucyLand
*/
pragma solidity 0.6.11;

contract Eleicao {
  
  mapping(address => bool) public advogados;
  mapping(address => bool) public advogadosJaVotaram;
  uint256 public totalDeAdvogados;
  address public servidor;
  string public materia;
  string public chapa1;
  string public chapa2;
  uint256 public votosChapa1;
  uint256 public votosChapa2;

  event VotoComputado(address advogado);

  constructor(
    string memory _materia,
    address _servidor,
    string memory _chapa1,
    string memory _chapa2
  ) public {
    materia = _materia;
    servidor = _servidor;
    chapa1 = _chapa1;
    chapa2 = _chapa2;
    registraAdvogado(0x4552af37231ac1B91281bC5268340c1B4cf0207A);
    registraAdvogado(0x3D81c1a50F8607c86db4fb1a6f530358a6Fc3D4d);
    registraAdvogado(0xF87404b20AB2c0D08d83DB3740Da234d35872c65);
    registraAdvogado(0x888cDa7b74D2364FfBA6c27FeFF2237501B85DF6);
    registraAdvogado(0xe3aa4714c07C7e0Bc8bf41C7F1B05B5773Cc8434);
    registraAdvogado(0x6423Cc6319c2CD3f0a313290a9B15120BFB83E65);
    registraAdvogado(0xA1d9EB502f7fd47c4AcEd2190823AdEE300e444F);
    registraAdvogado(0xc968c7fe97B63D108Bf7C04b371BA7a738223f55);
    registraAdvogado(0xAa0BadFFD8ab151807D61D0420b4383f8700018b);
  }

    function registraAdvogado (address _advogado) public returns (bool) {
        require(msg.sender == servidor, "Somente o servidor pode registrar o eleitor");
        advogados[_advogado] = true;
        totalDeAdvogados = totalDeAdvogados + 1;
        return true;
    }

    function impugnaAdvogado(address _advogado) public returns (bool) {
        require(msg.sender == servidor, "Somente servidor pode impugnar o eleitor");
        require(advogados[_advogado] == true, "Advogado apto não encontrado");
        advogados[_advogado] = false;
        totalDeAdvogados = totalDeAdvogados - 1;
        return true;
    }

    function votar(uint256 chapa) public returns (bool) {
        require(advogados[msg.sender] == true, "Seu endereço nao corresponde a uma inscrição ativa, contate o servidor");
        require(jaVotou(msg.sender) == false, "O voto desse endereço já foi computado");
        if (chapa == 1) {
            votosChapa1 = votosChapa1 + 1;
        } else if (chapa == 2) {
            votosChapa2 = votosChapa2 + 1;
        }
        emit VotoComputado(msg.sender);
        advogadosJaVotaram[msg.sender] = true;
        return true;
    }
  
    function jaVotou (address _advogado) public view returns (bool) {
        return advogadosJaVotaram[_advogado];
        
    }
    
/* 
Contrato de votação baseado no smartcontract depositado no github de jeffprestes.eth
*/

}
