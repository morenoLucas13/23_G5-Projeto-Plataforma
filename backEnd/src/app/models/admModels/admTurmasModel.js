const db = require("../../db");

// ADM MODEL TURMAS

const admTurmasModel = {}

admTurmasModel.buscarTurmas = async () => {
    let conexao;

    try {
        conexao = await db.criarConexao()

        const [consulta] = await conexao.execute(`SELECT * FROM disciplinas`)

        return consulta
    } catch (error) {
        console.error('Erro ao buscar disciplinas no banco de dados:', error)
    } finally {
        db.liberarConexao()
    }
}

module.exports = admTurmasModel;
