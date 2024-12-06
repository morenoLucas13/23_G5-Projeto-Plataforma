// Importando o Banco de Dados para gerenciar as conexões
const db = require('../../db');

// Importando módulo do express
const express = require('express');

// Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router();

// Importando o Model
const admTurmasModel = require('../../models/admModels/admTurmasModel');

const apiUtils = require('../../apiUtils');

// Buscar turmas
rotas.get('/', async (req, res) => {
    try {
        const turmas = await admTurmasModel.buscarTurmas()
        apiUtils.ok(res, turmas);
    } catch (error) {
        console.log('Ocorreu um erro ao buscar turmas!')
        apiUtils.erro(req, 'Ocorreu um erro ao buscar turmas!')
    }
})

// Buscar as disciplinas das turmas que o professor ministra
rotas.get('/buscarTurmasProfessorDisciplina/:id',
    async (req, res) => {
        try {
            let { id } = req.params;
            const turmas = await admTurmasModel.buscarTurmas()
            apiUtils.ok(res, turmas);
        } catch (error) {
            console.log('Ocorreu um erro ao buscar turmas!')
            apiUtils.erro(req, 'Ocorreu um erro ao buscar turmas!')
        }
    })

// Exportando as rotas
module.exports = rotas