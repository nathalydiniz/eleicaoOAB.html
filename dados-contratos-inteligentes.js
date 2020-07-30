var enderecoContrato = "0x789DBcB6923BC51A507B9C9D04Be802D75334644";
var abiContrato = [
			{
			"inputs": [
				{
					"internalType": "string",
					"name": "_nome",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_especie",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_sexo",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "_criador",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_tutor",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "_LocalDeNascimento",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "_dataDeNascimento",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_certificado",
					"type": "string"
				}
			],
			"name": "registroDoAnimal",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "animais",
			"outputs": [
				{
					"internalType": "string",
					"name": "nome",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "especie",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "sexo",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "criador",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "tutor",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "LocalDeNascimento",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "dataDeNascimento",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "certificado",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalDeAnimais",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];