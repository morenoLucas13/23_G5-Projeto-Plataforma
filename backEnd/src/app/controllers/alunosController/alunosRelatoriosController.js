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
rotas.post('/pontuacao', midVerificarJWToken.verifyToken, async (req, res) => {
    try {
        const userId = req.userId

        // Obter pontuação geral
        const pontuacao = await model.pontuacao(userId)

        // Obter dados detalhados da resposta do aluno
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
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao calcular os dados.'
        });
    }
});



rotas.post(
    '/:idSimulado/enviarRespostas',
    midVerificarJWToken.verifyToken,
    async (req, res) => {
      const { idSimulado } = req.params;
      const { respostas } = req.body; // Estrutura: { idQuestao: "A", ... }
  
      try {
        const userId = req.userId; // ID do aluno do token JWT
  
        // Chamar o model para processar as respostas e calcular a pontuação
        const resultado = await model.calcularPontuacao(idSimulado, userId, respostas);
  
        res.status(200).json({
          sucesso: true,
          mensagem: 'Respostas enviadas com sucesso!',
          dados: resultado,
        });
      } catch (error) {
        console.error('Erro ao processar respostas:', error);
        res.status(500).json({
          sucesso: false,
          mensagem: 'Erro ao processar as respostas do simulado.',
        });
      }
    }
  );
  




module.exports = rotas
