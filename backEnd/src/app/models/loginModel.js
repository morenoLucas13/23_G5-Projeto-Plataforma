// LOGIN MODEL

const db = require('../db/')


module.exports.login = async (email, senha) => {
    let conexao

    try {
        conexao = await db.criarConexao()
        // Executando a consulta SQL (Banco de Dados)
        const [linhas] = await conexao.execute(
            `SELECT * FROM usuarios WHERE us_email = ? AND us_senha = ?`, [email, senha])
        console.log(linhas)
        if (linhas.length == 1) { // Encontrou um usuário
            return { sucesso: true, nivel_acesso: linhas[0].us_nivel_acesso }
        } else {
            return { sucesso: false }
        }
    } catch (error) {
        throw error
    } finally {
        db.liberarConexao()
        console.log('Conexão finalizada!')
    }
}

module.exports.cadastrarUser = async (nome, email, senha, nivel_acesso) => {
    let conexao;
    try {
        conexao = await db.criarConexao()
        // Executando a consulta SQL (Banco de Dados)
        const [consulta] = await conexao.execute(
            `INSERT INTO usuarios (us_nome, us_email, us_senha, us_nivel_acesso) VALUES (?, ?, ?, ?);`,
            [nome, email, senha, nivel_acesso]);
        console.log('Resultado da Inserção:', consulta);

        // Retornando os dados que foram inseridos
        return { id: consulta.insertId, nome, email, senha, nivel_acesso };
    } catch (error) {
        console.error('Erro ao executar a query:', error);
        throw error; // Repassa o erro para o controlador
    } finally {
        db.liberarConexao();
        console.log('Conexão finalizada!')
    }
};

module.exports.exibirDadosUser = async (id) => {
    let conexao;

    try {
        conexao = await db.criarConexao()
        const [dadosUser] = await conexao.execute(
            `SELECT us_nome AS nome, us_email AS email FROM usuarios WHERE idusuario = ?`,[id])

        return dadosUser;
    } catch (error) {
        console.log('Ocorreu um erro de SQL ao executar a exibição dos dados do usuário!')
        throw error
    } finally {
        db.liberarConexao()
    }
}
