// Importando o Banco de Dados para gerenciar as conexões
const db = require('../../db');

// Importando módulo do express
const express = require('express');

// Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router();

// Importando o Model
const model = require('../../models/admModels/admSimuladosModel');
const { autorizarNivel } = require('../../middlewares/midBloquearAcessoPorNivel');

// Importando middlewares e validação Yup
const midValidarApiYup = require('../../middlewares/mwValidarApiYup');
const midVerificarJWToken = require('../../middlewares/midVerificarJWToken');
const { simuladoValidation } = require("../../validations/simulado.validation");

// Rota para exibir os simulados que o usuário professor fez
rotas.get('/simuladosCriados',
    midVerificarJWToken.verifyToken,
    autorizarNivel(1),
    async (req, res) => {
        try {
            const userId = req.userId;
            const simuladosCriados = await model.buscarSimuladosCriados(userId)

            if (!userId) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: ' O ID do usuário não foi fornecido!'
                });
            }

            // Retornando os simulados criados
            return res.status(200).json({
                sucesso: true,
                resposta: simuladosCriados
            })

        } catch (error) {
            console.log('Ops! Ocorreu um erro ao buscar os simulados criados pelo usuário!', error)
            res.status(500).json({
                sucesso: false,
                erro: 'Erro ao buscar simulados criados. Tente novamente mais tarde'
            });
        }
    }

)

rotas.put('/atualizarStatus/:id',
    midVerificarJWToken.verifyToken,
    autorizarNivel(1),
    async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const resultado = await model.atualizarStatusSimulado(id, status);

            if (!resultado) {
                return res.status(404).json({ sucesso: false, mensagem: 'Simulado não encontrado.' });
            }

            res.status(200).json({ sucesso: true, mensagem: 'Status atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar status do simulado:', error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar status do simulado.' });
        }
    }
);


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

                let idQuestao = questao.id

                if (!idQuestao) {

                    const novaQuestao = await model.criarQuestaoDoZero(
                        questao.nivel,
                        questao.disciplina_id,
                        questao.texto,
                        questao.enunciado,
                        questao.alternativaA,
                        questao.alternativaB,
                        questao.alternativaC,
                        questao.alternativaD,
                        questao.alternativaE,
                        questao.alternativaCorreta
                    );
                    idQuestao = novaQuestao.id
                }


                await model.adicionarQuestaoExistenteAoSimulado(novoSimulado.id, idQuestao);

                questoesAdicionadas.push({ id: questao.id, tipo: "existente" });
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

const { questoesValidation } = require("../../validations/questoes.validation");
// Rota para atualizar uma questão de um simulado
rotas.put('/atualizarQuestao',
    midVerificarJWToken.verifyToken,
    midValidarApiYup.validaEsquemaYupBody(questoesValidation),
    autorizarNivel(1),
    async (req, res) => {

        const {
            questao_id,
            disciplina_id,
            nivel,
            texto,
            enunciado,
            alternativaA,
            alternativaB,
            alternativaC,
            alternativaD,
            alternativaE,
            alternativaCorreta
        } = req.body

        // Realizar a conversão da letra para número
        let alternativaCorretaNumero;
        switch (alternativaCorreta) {
            case 'A': alternativaCorretaNumero = 1; break;
            case 'B': alternativaCorretaNumero = 2; break;
            case 'C': alternativaCorretaNumero = 3; break;
            case 'D': alternativaCorretaNumero = 4; break;
            case 'E': alternativaCorretaNumero = 5; break;
            default: alternativaCorretaNumero = 0; break; // Caso não seja válido
        }
        try {
            const questaoAtualizada = await model.atualizarQuestaoSimulado(
                questao_id,
                nivel,
                texto,
                enunciado,
                alternativaA,
                alternativaB,
                alternativaC,
                alternativaD,
                alternativaE,
                alternativaCorretaNumero
            );

            // Verificar se a questão foi atualizada com sucesso
            if (questaoAtualizada[0] === 0) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Não foi possível atualizar a questão.',
                });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Questão atualizada com sucesso!',
                questao: {
                    id: questao_id,
                    disciplinaId: disciplina_id,
                    nivel: nivel,
                    textoQuestao: texto,
                    enunciado: enunciado,
                    alternativas: {
                        A: alternativaA,
                        B: alternativaB,
                        C: alternativaC,
                        D: alternativaD,
                        E: alternativaE
                    },
                    alternativaCorreta: alternativaCorreta
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar questão:', error);
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro interno no servidor.',
            });
        }
    })

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
