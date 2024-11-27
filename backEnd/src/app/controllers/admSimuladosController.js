// Importando o Banco de Dados para gerenciar as conexões
const db = require('../db/');

// Importando módulo do express
const express = require('express');

// Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router();

// Importando o Model
const model = require('../models/simuladosModel');
const { autorizarNivel } = require('../middlewares/midBloquearAcessoPorNivel');

// Importando middlewares e validação Yup
const midValidarApiYup = require('../middlewares/mwValidarApiYup');
const midVerificarJWToken = require('../middlewares/midVerificarJWToken');
const { simuladoValidation } = require("../validations/simulado.validation");

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

// Rota para criar um novo simulado
rotas.post('/criarNovoSimulado',
    midVerificarJWToken.verifyToken,
    midValidarApiYup.validaEsquemaYupBody(simuladoValidation),
    autorizarNivel(1),
    async (req, res) => {
        try {
            const { turma_id, descricao, status, disciplina_id, questoes } = req.body;
            const professor = req.userId;

            const novoSimulado = await model.criarNovoSimulado(
                turma_id,
                descricao,
                professor,
                status,
                disciplina_id,
                questoes.length
            );

            const questoesAdicionadas = [];

            for (let i = 0; i < questoes.length; i++) {
                const questao = questoes[i];
                
                if (questao.id) {
                    await model.adicionarQuestaoExistenteAoSimulado(novoSimulado.id, questao.id);
                    questoesAdicionadas.push({ id: questao.id, tipo: "existente" });
                } else {
                    const { nivel, texto, enunciado, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta } = questao;

                    const novaQuestao = await model.criarQuestaoDoZero({
                        nivel, 
                        disciplina_id, 
                        texto, 
                        enunciado, 
                        alternativaA, 
                        alternativaB, 
                        alternativaC, 
                        alternativaD, 
                        alternativaE, 
                        alternativaCorreta
                    });
                    
                    await model.adicionarQuestaoExistenteAoSimulado(novoSimulado.id, novaQuestao.id);
                    questoesAdicionadas.push({
                        id: novaQuestao.id,
                        tipo: "nova",
                        texto,
                        enunciado
                    });
                }
            }

            res.status(201).json({
                mensagem: "Simulado criado com sucesso",
                simulado: novoSimulado,
                questoesAdicionadas
            });

        } catch (error) {
            console.log('Erro ao criar um simulado: ', error);
            res.status(500).json({
                erro: 'Ops! Ocorreu um erro ao criar um simulado. Tente novamente ;)'
            });
        }
    }
);

// Rota para excluir um simulado
rotas.delete('/:id',
    midVerificarJWToken.verifyToken,
    autorizarNivel(1),
    async (req, res) => {
        const { id } = req.params;

        try {
            const resultado = await model.excluirSimulado(id);
            if (!resultado.affectedRows) {
                return res.status(404).json({ erro: 'Ops! Simulado não encontrado.' });
            }

            res.json({ mensagem: 'Simulado excluído com sucesso!', simuladoExcluidoId: id });
        } catch (error) {
            console.log('Ops! Erro ao apagar um simulado:', error);
            res.status(500).json({ erro: 'Ocorreu um erro ao remover um simulado. Tente novamente.' });
        }
        console.log('Fim da rota DELETE de Simulados!');
    }
);


// Exportando as rotas
module.exports = rotas;
