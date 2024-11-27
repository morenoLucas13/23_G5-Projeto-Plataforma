// LOGIN MODEL

const db = require('../db/')


module.exports.login = async (email, senha) => {
    let conexao;

    try {
        conexao = await db.criarConexao();

        // 1º Tentativa: Procurar o email na tabela professor
        const [professor] = await conexao.execute(
            `SELECT idprofessor AS id, 1 AS nivel_acesso FROM professor WHERE us_email = ? AND us_senha = ?`,

            [email, senha]
        )

        // Vendo se retorna o id e o nível de acesso
        if (professor.length > 0) {
            return { sucesso: true, id: professor[0].id, nivel_acesso: 1 }; // 1 = professor
        }

        // 2º Tentativa: Procurar o email na tabela alunos
        const [aluno] = await conexao.execute(
            `SELECT idalunos AS id, 2 AS nivel_acesso FROM alunos WHERE email = ? AND senha = ?`,

            [email, senha]
        )

        // Vendo se retorna o id e o nível de acesso 
        if (aluno.length > 0) {
            return { sucesso: true, id: aluno[0].id, nivel_acesso: 2 }; // 2 = aluno
        }

        // Se não encontrar nem professor nem aluno, retorna login inválido
        return { sucesso: false, mensagem: "Usuário ou senha incorretos. Tente novamente ;)" };

    } catch (error) {
        console.error('Ops! Ocorreu um erro ao tentar logar:', error);
        throw error;
    } finally {
        db.liberarConexao();
        console.log('Conexão finalizada!');
    }
};

// Função que verifica se o email já existe no banco de dados
module.exports.verificarEmailExistente = async (email) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        const [resultado] = await conexao.execute(
            `SELECT * FROM professor WHERE us_email = ? LIMIT 1`, 
            [email]
        );

        // Caso o tamanho do resultado for maior que 0, significa que já existe um email existindo
        return resultado.length > 0;
    } catch (error) {
        console.error('Erro ao verificar se o email já existe:', error);
        throw error;
    } finally {
        db.liberarConexao();
    }
};

module.exports.cadastrarProfessor = async (nome, email, senha, nivelAcesso, disciplinasAula) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Inserção de professores na tabela 'professor'
        const [consulta] = await conexao.execute(
            `INSERT INTO professor (us_nome, us_email, us_senha, us_nivel_acesso, disciplinas) VALUES (?, ?, ?, ?, ?);`,
            [nome, email, senha, nivelAcesso, disciplinasAula]
        );

        console.log('Resultado da Inserção:', consulta);

        // Retornando os dados que foram inseridos
        return { id: consulta.insertId, nome, email, nivelAcesso, disciplinasAula };
    } catch (error) {
        console.error('Erro ao executar a query:', error);
        throw error; // Repassa o erro para o controlador
    } finally {
        db.liberarConexao();
        console.log('Conexão finalizada!');
    }
};

module.exports.cadastrarAluno = async (nome, email, senha, nivelAcesso) => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Inserção de alunos na tabela 'aluno'
        const [consulta] = await conexao.execute(
            `INSERT INTO alunos (us_nome, us_email, us_senha, us_nivel_acesso) VALUES (?, ?, ?, ?);`,
            [nome, email, senha, nivelAcesso]
        );

        console.log('Resultado da Inserção:', consulta);

        // Retornando os dados que foram inseridos
        return { id: consulta.insertId, nome, email, nivelAcesso };
    } catch (error) {
        console.error('Erro ao executar a query:', error);
        throw error; // Repassa o erro para o controlador
    } finally {
        db.liberarConexao();
        console.log('Conexão finalizada!');
    }
};







module.exports.exibirDadosUser = async (id, nivel_acesso) => {
    let conexao;

    try {
        conexao = await db.criarConexao();

        let consulta;
        let parametros = [id];

        if (nivel_acesso === 1) { // 1 = professor
            consulta = `SELECT us_nome AS nome FROM professor WHERE idprofessor = ?`;
        } else if (nivel_acesso === 2) { // 2 = aluno
            consulta = `SELECT nome, pontuacao FROM alunos WHERE idalunos = ?`;
        } else {
            throw new Error('Nível de acesso inválido!');
        }

        // Executando a consulta de acordo com o nível de acesso
        const [dadosUser] = await conexao.execute(consulta, parametros);
        return dadosUser;

    } catch (error) {
        console.log('Ocorreu um erro de SQL ao executar a exibição dos dados do usuário!');
        throw error;
    } finally {
        db.liberarConexao();
    }
}



       

