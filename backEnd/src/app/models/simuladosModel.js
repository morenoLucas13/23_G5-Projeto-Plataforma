

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

module.exports.criarQuestaoDoZero = async ({ nivel, disciplina_id, texto, enunciado, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta }) => {
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



module.exports.excluirSimulado = async (id) => {
    let conexao

    try {
        conexao = await db.criarConexao()

        const [consulta] = await conexao.execute(
            `DELETE FROM simulados WHERE idsimulado = ?`, [id]
        )

        return consulta

    } catch (error) {
        console.log('Ocorreu um erro ao excluir um simulado:', error);
        throw error;
    } finally {
        db.liberarConexao()
    }
}









// Comando SQL para trazer todos os simulados que já foram aplicados no ano atual do sistema
// SELECT * FROM simulados WHERE YEAR(simu_dataCriacao) = YEAR(CURDATE());