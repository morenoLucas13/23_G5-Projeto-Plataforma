//  Importando o Banco de Dados para gerenciar as conexões
const db = require('../db')

//  Importando módulo do express
const express = require('express')

//  Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router()


// Importanto middlewares e funcionalidades JWT necessárias
const model = require('../models/relatoriosModel')
const midVerificarJWToken = require('../middlewares/midVerificarJWToken');
const { autorizarNivel } = require('../middlewares/midBloquearAcessoPorNivel');
// const { calcularPontuacaoPorResposta } = require('../ferramentas/pontuacao');


rotas.get('/rankingGeral',
    midVerificarJWToken.verifyToken,
    autorizarNivel(2),
    async (req, res) => {
        try {
            const rankingGeralAlunos = await model.obterRankingGeral()

            res.status(200).json({
                sucesso: true,
                mensagem: 'Ranking geral dos melhores alunos!',
                ranking: rankingGeralAlunos
            })

        } catch (error) {
            res.status(500).json({
                sucesso: false,
                mensagem: 'Ops! Ocorreu um erro ao buscar o ranking geral dos alunos!',
                erro: error
            })
        }

        console.log('Fim da rota GET do ranking geral dos alunos!')
    })

// rotas.get('/:idSimulado', midVerificarJWToken.verifyToken, async (req, res) => {
//     try {
//         const userId = req.userId;
//         const idSimulado = req.params.idSimulado
//         console.log(userId);

//         // Obtendo as respostas do aluno
//         const respostasAluno = await model.dadosRespostaAluno( idSimulado, userId);

//         // Verificando se há respostas
//         if (respostasAluno.length === 0) {
//             return res.status(404).json({
//                 sucesso: false,
//                 mensagem: 'Ops! Nenhuma resposta encontrada para o aluno!'
//             });
//         }


//         const respostas = respostasAluno.map(item => ({
//             resposta: item.resposta === null ? 0 : item.resposta,
//             nivelTRI: item.ques_triNivel
//         }));

//         // Calculando a pontuação
//         const pontuacaoTotal = await calcularPontuacaoPorResposta(respostas);

//         // Enviando a resposta com a pontuação total
//         res.status(200).json({
//             sucesso: true,
//             mensagem: 'Pontuação calculada com sucesso!',
//             pontuacao: pontuacaoTotal
//         });

//     } catch (error) {
//         res.status(500).json({
//             sucesso: false,
//             mensagem: 'Ops! Ocorreu um erro ao capturar os dados respostas do estudante!',
//             erro: error.message
//         });
//     }

//     console.log('Fim da rota GET de captura dos dados de respostas do estudante!');
// });

rotas.get('/pontuacao/:id', midVerificarJWToken.verifyToken, async (req, res) => {
    const idMatricula = req.params.id

    try {
        const relatorio = await model.pontuacao(idMatricula, req.userId)
        res.status(200).json({
            sucesso: true,
            mensagem: 'OK!',
            dados: relatorio
            
        });
    } catch (error) {
        
    }
})




module.exports = rotas
