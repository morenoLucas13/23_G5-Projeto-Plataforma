//  Importando o Banco de Dados para gerenciar as conexões
const db = require('../db/')

//  Importando módulo do express
const express = require('express')

//  Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router()

//  Importando o Model
const model = require('../models/questoesModel')

// Importando os middlewares e funcionalidades de validação necessárias
const midValidarApiYup = require('../middlewares/mwValidarApiYup');
const midVerificarJWToken = require('../middlewares/midVerificarJWToken');
const { autorizarNivel } = require('../middlewares/midBloquearAcessoPorNivel')
const { questoesValidation } = require("../validations/questoes.validation");

// Rota para inserir uma questão com verificação de duplicidade
rotas.post('/criarNovaQuestao',
    midVerificarJWToken.verifyToken,
    midValidarApiYup.validaEsquemaYupBody(questoesValidation),
    autorizarNivel(1),

    async (req, res) => {
        // Desestruturando os dados da requisição
        const { iddisciplina, nivelTRI, questaoTexto, enunciado, alternativas, respCorreta } = req.body

        try {
            // Validando o body da requisição
            await questoesValidation.validate(req.body, { abortEarly: false })

        } catch (error) {
            return res.status(200).json({ sucesso: false, erros: error.errors })
        }

        try {
            // Verificando se a questão já existe
            const questaoExistente = await model.buscarQuestaoPorEnunciado(enunciado)
            if (questaoExistente) {
                return res.status(400).json({ erro: 'A questão já existe na base de dados!' })
            }

            // Chamando a função para criar uma nova questão
            const novaQuestao = await model.criarNovaQuestao(
                iddisciplina,
                nivelTRI,
                questaoTexto,
                enunciado,
                alternativas,
                respCorreta
            );

            res.status(201).json({
                sucesso: "Questão criada com sucesso!",
                questao: novaQuestao
            });


        } catch (error) {
            console.log('Erro ao criar uma nova questão:', error);
            res.status(500).json({ erro: 'Ops! Ocorreu um erro ao criar uma questão. Tente novamente ;)' });
        }
        console.log('Fim da rota POST de criação de questões!')
    }
)

// Rota para buscar questões específicas de uma determinada disciplina
rotas.get('/questoesDisciplina/:disciplinaId',
    midVerificarJWToken.verifyToken,
    autorizarNivel(1),

    async (req, res) => {
        const { disciplinaId } = req.params;

        try {
            // Validando o ID da disciplina usando o Pick() do Yup para selecionar apenas o iddisciplina
            await questoesValidation.pick(['iddisciplina']).validate({ iddisciplina: disciplinaId }, { abortEarly: false });

            console.log('ID Disciplina:', disciplinaId);

        } catch (error) {
            return res.status(400).json({ sucesso: false, erros: error.errors });
        }

        try {
            // Buscando as questões no banco de dados de acordo com o ID da disciplina
            const buscarQuestoes = await model.buscarQuestoesPorDisciplina(disciplinaId);

            if (buscarQuestoes.length === 0) {
                return res.status(404).json({ sucesso: false, mensagem: 'Ops! Nenhuma questão encontrada para essa disciplina :(' });
            }

            // Retornando as questões encontradas
            res.status(200).json({ sucesso: true, questoes: buscarQuestoes });

        } catch (error) {
            console.error('Erro ao buscar questões:', error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar questões da disciplina' });
        }
        console.log('Fim da rota GET de buscar questões por disciplina!')
    }
);

// Rota para adicionar uma questão a um simulado
rotas.post('/adicionarQuestaoSimulado',
    midVerificarJWToken.verifyToken,
    autorizarNivel(1),

    async (req, res) => {
        const { simuladoId, questaoId } = req.body;

        try {
            await addQuestaoSimulado.adicionarQuestaoSimulado(simuladoId, questaoId);

            return res.status(201).json({
                sucesso: true,
                mensagem: "Questão adicionada com sucesso ;)"
            });

        } catch (error) {
            // Lidando com o erro de questão já existente
            if (error.mensagem === 'Questão já adicionada ao simulado.') {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Questão já adicionada ao simulado."
                });
            }


            return res.status(500).json({
                mensagem: 'Ops! Ocorreu um erro ao adicionar a questão!',
                erro: error
            });
        }
    }
);




// Exportando as rotas
module.exports = rotas

