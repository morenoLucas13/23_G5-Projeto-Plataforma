"use strict"

// Incluindo os pacotes do express e do cors no projeto
const express = require('express');
const cors = require('cors');

// Criar uma constante app que recebe o express
const app = express();

// Criar uma constante que define em qual porta, o servidor vai rodar
const porta = 3000;

// Inserindo middlewares
app.use(cors());
app.use(express.json());

// Inicia o servidor na porta
app.listen(porta, () => {
    console.log(`Server rodando em http://localhost:${porta}`);
});