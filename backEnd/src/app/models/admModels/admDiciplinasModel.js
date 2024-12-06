const db = require("../../db");

// ADM MODEL TURMAS

const admDiciplinasModel = {}

admDiciplinasModel.buscarDisciplinas = async () => {
    let conexao;

    try {
        conexao = await db.criarConexao()

        const [consulta] = await conexao.execute(`SELECT * FROM disciplinas`)

        return consulta
    } catch (error) {
        console.error('Erro ao buscar disciplinas no banco de dados:', error);
        throw error;
    } finally {
        db.liberarConexao()
    }
}

admDiciplinasModel.buscarPorProfessor = async (idProfessor) => {
    let conexao;

    try {
        conexao = await db.criarConexao()

        const [consulta] = await conexao.execute(`SELECT * FROM disciplinas where idprofessor = ?`, [idProfessor])

        return consulta
    } catch (error) {
        console.error('Erro ao buscar disciplinas no banco de dados:', error);
        throw error;
    } finally {
        db.liberarConexao()
    }
}

module.exports = admDiciplinasModel;
