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
rotasAdmDisciplinas.get('/buscarPorProfessor',
    async (req, res) => {
        try {
            let { id } = req.id_professor;
            const resultado = await admDiciplinasModel.buscarPorProfessor(id)
            apiUtils.ok(res, resultado);
        } catch (error) {
            console.log('Ocorreu um erro ao buscar turmas!')
            apiUtils.erro(res, 'Ocorreu um erro ao buscar turmas!')
        }
    })


// Exportando as rotas
module.exports = rotasAdmDisciplinas