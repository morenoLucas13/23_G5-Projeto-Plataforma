// QUESTÕES MODEL

const db = require('../db/')

module.exports.buscarQuestaoPorEnunciado = async (enunciado) => {
    let conexao

    try {
        conexao = await db.criarConexao()

        // Verificando se a questão já existe com base no enunciado
        const consulta = `SELECT * FROM questoes WHERE ques_enunciado = ?`

        const [linhas] = await conexao.execute(consulta, [enunciado])

        // Operador ternário
        // Retorna a questão se ela existir, ou null se não encontrada
        return linhas.length > 0 ? linhas[0] : null

    } catch (error) {
        console.error('Ocorreu um erro ao buscar questão por enunciado:', error)
        throw error
    } finally {
        db.liberarConexao(conexao)
    }
};


module.exports.criarNovaQuestao = async (
    iddisciplina, nivelTRI, questaoTexto, enunciado, alternativas, respCorreta) => {
    let conexao;

    try {
        conexao = await db.criarConexao();

        // Inserindo uma nova questão na tabela "questoes"
        const [consultaQuestao] = await conexao.execute(
            `INSERT INTO questoes (iddisciplina, ques_triNivel, ques_textoQuestao, ques_enunciado) VALUES (?, ?, ?, ?)`,
            [iddisciplina, nivelTRI, questaoTexto, enunciado]
        );

        // Obtendo o ID da questão criada
        const idQuestao = consultaQuestao.insertId;

        // Inserindo as alternativas na tabela "alternativas" uma a uma por meio do FOR
        for (let i = 0; i < alternativas.length; i++) {
            const alternativa = alternativas[i];
            await conexao.execute(
                `INSERT INTO alternativas (idquestao, textoAlternativa, correta) VALUES (?, ?, ?)`,
                [idQuestao, alternativa, i === respCorreta] 
            ); 
        }

        return {
            idQuestao,
            mensagem: "A Questão e suas respectivas alternativas foram inseridas com sucesso!"
        };

    } catch (error) {
        console.error('Ocorreu um erro ao inserir um novo simulado:', error);
        throw error;
    } finally {
        db.liberarConexao();
    }
};

module.exports.buscarQuestoesPorDisciplina = async (iddisciplina) => {
    let conexao;

    try {
        conexao = await db.criarConexao()

        const [buscarQuestaoDisciplina] = await conexao.execute(
            `SELECT * FROM questoes WHERE iddisciplina = ?`,
            [iddisciplina]
        )

        return buscarQuestaoDisciplina
        
    } catch (error) {
        console.error('Erro ao buscar questões no banco de dados:', error)
    } finally {
        db.liberarConexao()
    }
}





