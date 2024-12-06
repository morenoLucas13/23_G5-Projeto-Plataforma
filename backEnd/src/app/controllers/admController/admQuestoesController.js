// Importando o Banco de Dados para gerenciar as conexões
const db = require('../../db');

// Importando módulo do express
const express = require('express');

// Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router();

// Importando o Model
const model = require('../../models/admModels/admQuestoesModel');
const { autorizarNivel } = require('../../middlewares/midBloquearAcessoPorNivel');
const { questoesValidation } = require('../../validations/questoes.validation')
// Importando middlewares e funcionalidades do Yup
const midVerificarJWToken = require('../../middlewares/midVerificarJWToken');

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





// Exportando as rotas
module.exports = rotas
