//  Importando o Banco de Dados para gerenciar as conexões
const db = require('../db/')

//  Importando módulo do express
const express = require('express')

//  Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router()

//  Importando o Model
const model = require('../models/simuladosModel')

// Middleware para analisar o corpo da requisição como JSON
rotas.use(express.json())

rotas.get('/agendados', async (req, res) => {
    try {
        const simuladosAgendados = await model.exibirSimuladosAgendados();
        res.json(simuladosAgendados);
    } catch (error) {
        console.log('Ops! Erro ao acessar as informações dos simulados :(');
        res.status(500).json({ sucesso: false, erro: 'Erro ao obter os detalhes dos simulados!' });
    }
    console.log('Fim da rota GET de exibição dos simulados agendados!');
});

