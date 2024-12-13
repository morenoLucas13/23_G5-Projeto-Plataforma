//  Importando o Banco de Dados para gerenciar as conexões
const db = require('../../db')

//  Importando módulo do express
const express = require('express')

//  Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router()


// Importanto middlewares e funcionalidades JWT necessárias
const model = require('../../models/alunosModels/alunosRelatoriosModel');
const midVerificarJWToken = require('../../middlewares/midVerificarJWToken');
const { autorizarNivel } = require('../../middlewares/midBloquearAcessoPorNivel');
// const { calcularPontuacaoPorResposta } = require('../ferramentas/pontuacao');

// Rota para buscar o ranking
rotas.get(
    '/rankingGeral',
    midVerificarJWToken.verifyToken,
    autorizarNivel(2),
    async (req, res) => {
        try {
            // Log para depuração
            console.log('Token recebido:', req.headers.authorization);

            // Obtenha o ranking geral
            const rankingGeralAlunos = await model.obterRankingGeral();

            // Retorne sucesso
            res.status(200).json({
                sucesso: true,
                mensagem: 'Ranking geral dos melhores alunos!',
                ranking: rankingGeralAlunos,
            });
        } catch (error) {
            // Log detalhado para depuração
            console.error('Erro ao buscar ranking geral:', error);

            res.status(500).json({
                sucesso: false,
                mensagem: 'Ops! Ocorreu um erro ao buscar o ranking geral dos alunos!',
                erro: error.message,
            });
        }
    }
);

// Rota para fazer o aluno pontuar nas questões que ele fez em um simulado
rotas.post('/pontuacao/:idSimulado', midVerificarJWToken.verifyToken, async (req, res) => {
    try {
        const userId = req.userId
        const { idSimulado } = req.params
        const { respostas } = req.body

        // Obter pontuação geral
        const pontuacao = await model.pontuacao(userId, idSimulado, respostas)

        // Obter dados detalhados da resposta do aluno
        // Número de questões respondidas, erradas e acertadas
        const respostasDetalhadas = await model.dadosRespostaAluno(idSimulado, userId);

        if (!pontuacao || !respostasDetalhadas) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Nenhuma informação encontrada para este aluno.'
            });
        }

        res.status(200).json({
            sucesso: true,
            mensagem: 'Dados calculados com sucesso!',
            pontuacao,
            respostasDetalhadas
        });
    } catch (error) {
        console.error('Erro na rota de pontuação:', error);
        res.json({
            sucesso: false,
            mensagem: 'Erro ao calcular os dados.'
        });
    }
});









module.exports = rotas
