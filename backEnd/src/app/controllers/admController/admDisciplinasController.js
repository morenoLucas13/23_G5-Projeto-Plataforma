// Importando módulo do express
const express = require('express');

// Usa-se Router para ser um gerenciador das rotas no Controller
const rotasAdmDisciplinas = express.Router();

// Importando o Model
const apiUtils = require('../../apiUtils');
const admDiciplinasModel = require('../../models/admModels/admDiciplinasModel');


// Buscar turmas
rotasAdmDisciplinas.get('/', async (req, res) => {
    try {
        const resultado = await admDiciplinasModel.buscarDisciplinas();
        apiUtils.ok(res, resultado);
    } catch (error) {
        console.log('Ocorreu um erro ao buscar turmas!')
        apiUtils.erro(req, 'Ocorreu um erro ao buscar turmas!')
    }
})

// Buscar as disciplinas das turmas que o professor ministra
const midVerificarJWToken = require('../../middlewares/midVerificarJWToken');
rotasAdmDisciplinas.get('/buscarPorProfessor', midVerificarJWToken.verifyToken, async (req, res) => {
    try {
        const idProfessor = req.id_professor;
        if (!idProfessor) {
            return apiUtils.erro(res, 'ID do professor não foi fornecido.');
        }
        const resultado = await admDiciplinasModel.buscarPorProfessor(idProfessor);
        apiUtils.ok(res, resultado);
    } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
        apiUtils.erro(res, 'Ocorreu um erro ao buscar disciplinas.');
    }
});


// Exportando as rotas
module.exports = rotasAdmDisciplinas