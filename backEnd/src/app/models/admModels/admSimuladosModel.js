// ADM SIMULADOS MODEL

const db = require('../../db')


// Exibindo simulados criados (PROFESSOR)
module.exports.buscarSimuladosCriados = async (userId) => {
    let conexao;

    try {
        conexao = await db.criarConexao()

        const [consulta] = await conexao.execute(
            `SELECT 
    s.idsimulado AS id,
    s.simu_descricao AS descricao,
    s.simu_dataCriacao AS data_criacao,
    COUNT(q.idquestao) AS totalQuestoes,
    d.dis_nome AS nomeDisciplina
FROM simulados s
LEFT JOIN questoes_selecionadas qs ON qs.idsimulado = s.idsimulado
LEFT JOIN questoes q ON qs.idquestao = q.idquestao
LEFT JOIN disciplinas d ON q.iddisciplina = d.iddisciplina
WHERE s.idprofessor = 7
GROUP BY 
    s.idsimulado, 
    s.simu_descricao, 
    s.simu_dataCriacao, 
    d.dis_nome;`
        )


        return consulta

    } catch (error) {
        console.log('Erro ao buscar simulados criados pelo usuário: ', error)
        throw error

    } finally {
        db.liberarConexao()
    }
}


// FUNÇÕES PARA SEREM CHAMADAS DURANTE O PROCESSO DE CRIAÇÃO DE SIMULADO
module.exports.adicionarQuestaoExistenteAoSimulado = async (novoSimuladoId, questaoId) => {
    let conexao;

    try {
        conexao = await db.criarConexao();
        await conexao.execute(
            `INSERT INTO questoes_selecionadas (idsimulado, idquestao) VALUES (?, ?);`,
            [novoSimuladoId, questaoId]
        );
    } catch (error) {
        console.log('Erro ao adicionar questões ao simulado:', error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.buscarQuestaoPorEnunciado = async (enunciado) => {
    let conexao;

    try {
        conexao = await db.criarConexao();
        const [linhas] = await conexao.execute(
            `SELECT * FROM questoes WHERE ques_enunciado LIKE ?`,
            [`%${enunciado}%`]
        );

        return linhas.length > 0 ? linhas : null;
    } catch (error) {
        console.log('Ocorreu um erro ao buscar questão por enunciado:', error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.criarQuestaoDoZero = async (nivel, disciplina_id, texto, enunciado, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) => {

    let conexao;

    try {
        conexao = await db.criarConexao();
        const [resultado] = await conexao.execute(
            `INSERT INTO questoes(
                iddisciplina,
                ques_triNivel, 
                ques_textoQuestao, 
                ques_enunciado, 
                ques_alternativaA, 
                ques_alternativaB, 
                ques_alternativaC, 
                ques_alternativaD, 
                ques_alternativaE, 
                ques_alternativaCorreta 
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [disciplina_id, nivel, texto, enunciado, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta]
        );
        return { id: resultado.insertId };
    } catch (error) {
        console.log('Ocorreu um erro ao criar uma questão do zero: ', error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

function formatacaoDataHora() {
    let dia = (new Date()).toISOString().slice(0, 10);
    let hora = (new Date()).toLocaleTimeString();
    return dia + ' ' + hora;
}

module.exports.criarNovoSimulado = async (turma_id, descricao, professor, status, disciplina_id, questoes) => {
    let conexao;

    try {
        conexao = await db.criarConexao();
        const data = formatacaoDataHora();

        const [consulta] = await conexao.execute(
            `INSERT INTO simulados (
                idturma, 
                simu_descricao, 
                idprofessor, 
                simu_dataCriacao, 
                simu_ativo, 
                simu_conclusao
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [turma_id, descricao, professor, data, status, 0]
        );

        return {
            id: consulta.insertId,
            turma_id,
            descricao,
            professor,
            dataCriacao: data,
            status,
            concluido: 0
        };
    } catch (error) {
        console.log('Ocorreu um erro ao inserir um novo simulado:', error);
        throw error;
    } finally {
        db.liberarConexao(conexao);
    }
};

module.exports.atualizarQuestaoSimulado = async (
    questao_id,
    nivel,
    texto,
    enunciado,
    alternativaA,
    alternativaB,
    alternativaC,
    alternativaD,
    alternativaE,
    alternativaCorreta
) => {
    let conexao;

    try {
        conexao = await db.criarConexao();
        const sql = conexao.format(
            `UPDATE questoes 
            SET ques_triNivel = ?, 
            ques_textoQuestao = ?, 
            ques_enunciado = ?, 
            ques_alternativaA = ?, 
            ques_alternativaB = ?, 
                 ques_alternativaC = ?, 
                 ques_alternativaD = ?, 
                 ques_alternativaE = ?, 
                 ques_alternativaCorreta = ? 
                 WHERE idquestao = ?`,

            [
                nivel,
                texto,
                enunciado,
                alternativaA,
                alternativaB,
                alternativaC,
                alternativaD,
                alternativaE,
                alternativaCorreta,
                questao_id
            ]
        );

        console.log("sql a ser executado: \n", sql);
        
        const [consulta] = await conexao.execute(sql)

        console.log('Resultado da atualização:', consulta)

        if (consulta.affectedRows === 0) {
            return null;
        }

        const [questaoAtualizada] = await conexao.execute(
            `SELECT * FROM questoes WHERE idquestao = ?`,
            [questao_id]
        );

        console.log('Questão atualizada:', questaoAtualizada)

        return questaoAtualizada.length > 0 ? questaoAtualizada[0] : null
    } catch (error) {
        console.error("Erro ao atualizar questão no banco de dados:", error)

        console.log("JSON ERRO", JSON.stringify(error, null, 2));

        throw error;
    } finally {
        db.liberarConexao(conexao)
    }
};

