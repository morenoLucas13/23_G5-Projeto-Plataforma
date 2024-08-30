"use strict"

// Incluindo os pacotes do express e do cors no projeto
const express = require('express');
const cors = require('cors');

// Criar uma constante app que recebe o express
const app = express();

// Criar uma constante que define em qual porta, o servidor vai rodar
const porta = 3313;


// Inserindo middlewares
app.use(cors());
app.use(express.json());

const midLogConsole = require('./src/app/middlewares/midLogConsole');
app.use(midLogConsole);


//  Importando as rotas
const rotasLogin =
    require('./src/app/controllers/loginController');
app.use("/api/login", rotasLogin)


// Inicia o servidor na porta
app.listen(porta, () => {
    console.log(`Server rodando em http://localhost:${porta}`);
});