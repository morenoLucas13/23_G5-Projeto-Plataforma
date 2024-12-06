// ADM QUESTÕES MODEL

const db = require('../../db')


module.exports.buscarQuestoesPorDisciplina = async (disciplinaId) => {
    let conexao;

    try {
        conexao = await db.criarConexao()

        const [buscarQuestaoDisciplina] = await conexao.execute(
            `SELECT * FROM questoes WHERE iddisciplina = ?`,
            [disciplinaId]
        )

        return buscarQuestaoDisciplina
        
    } catch (error) {
        console.error('Erro ao buscar questões no banco de dados:', error)
    } finally {
        db.liberarConexao()
    }
}





