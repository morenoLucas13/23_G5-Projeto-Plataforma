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

/// ============================= ÁREA DO ESTUDANTE ========================================///
const rotasAlunosSimulados = require('./src/app/controllers/alunosController/alunosSimuladosController')
app.use('/api/alunos/simulados', rotasAlunosSimulados)

const rotasAlunosRelatorios = require("./src/app/controllers/alunosController/alunosRelatoriosController")
app.use("/api/alunos/relatorios", rotasAlunosRelatorios)


/// ============================= ÁREA ADMINISTRATIVA =======================================///
const rotasAdmSimulados = require('./src/app/controllers/admController/admSimuladosController')
app.use('/api/adm/simulados', rotasAdmSimulados)

const rotasAdmQuestoes = require('./src/app/controllers/admController/admQuestoesController')
app.use('/api/adm/questoes', rotasAdmQuestoes)

const rotasAdmTurmas = require('./src/app/controllers/admController/admTurmasController');
app.use('/api/adm/turmas', rotasAdmTurmas)

const rotasAdmDisciplinas = require("./src/app/controllers/admController/admDisciplinasController");
app.use('/api/adm/disciplinas', rotasAdmDisciplinas)


// Inicia o servidor na porta
app.listen(porta, () => {
    console.log(`Server rodando em http://localhost:${porta}`);
});