"use strict"

// Incluindo os pacotes e configurações do projeto
require("dotenv-safe").config();
const express = require('express');
const cors = require('cors');

// Criar uma constante app que recebe o express
const app = express();

// Criar uma constante que define em qual porta, o servidor vai rodar
const porta = 3901;


// Inserindo middlewares
app.use(express.json());
app.use(cors());

const midLogConsole = require('./src/app/middlewares/midLogConsole');
app.use(midLogConsole);


//  Importando as rotas
const rotasLogin = require('./src/app/controllers/loginController');
app.use("/api/login", rotasLogin)

const rotasSimulados = require('./src/app/controllers/simuladosController');
app.use('/api/simulados', rotasSimulados)

const rotasQuestoes = require('./src/app/controllers/questoesController');
app.use('/api/questoes', rotasQuestoes)



// Inicia o servidor na porta
app.listen(porta, () => {
    console.log(`Server rodando em http://localhost:${porta}`);
});