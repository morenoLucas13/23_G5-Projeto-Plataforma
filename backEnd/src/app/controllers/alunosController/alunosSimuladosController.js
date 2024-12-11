// Importando o Banco de Dados para gerenciar as conexões
const db = require('../../db');

// Importando módulo do express
const express = require('express');

// Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router();

// Importando o Model
const model = require('../../models/alunosModels/alunosSimuladosModel');

// Rota para exibir os simulados que encontram-se agendados
rotas.get('/agendados', async (req, res) => {
    try {
        const simulados = await model.obterSimuladosAgendados();

        if (simulados.length > 0) {
            res.json({ sucesso: true, simulados });
        } else {
            res.status(200).json({ sucesso: false, mensagem: "Ops. Nenhum simulado agendado encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar simulados agendados :(" });
        console.error('Erro ao buscar simulados agendados: ', error);
    }
    console.log('Fim da rota GET de Simulados Agendados!');
});

// =======================================================================

// Rota para exibir as questões referentes a um simulado
// Aluno respondendo
rotas.get('/:idSimulado/questoes', async (req, res) => {
    const { idSimulado } = req.params;
    console.log('ID do Simulado recebido no back-end:', idSimulado); // Debug

    try {
        const questoes = await model.buscarQuestoesDoSimulado(idSimulado);

        if (questoes.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Nenhuma questão encontrada para o simulado selecionado :("
            });
        }

        return res.status(200).json({
            sucesso: true,
            questoesSimulado: questoes
        });
    } catch (error) {
        console.log('Erro ao buscar questões:', error);
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao buscar questões. Tente novamente mais tarde!"
        });
    }
});




// Exportando as rotas
module.exports = rotas;