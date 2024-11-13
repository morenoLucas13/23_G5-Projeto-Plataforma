// RANKING MODEL

const db = require('../db')

// Exibir o ranking geral dos 10 melhores alunos a partir de suas pontuações
module.exports.obterRankingGeral = async () => {
    let conexao;

    try {
        conexao = await db.criarConexao()

        const [consulta] = await conexao.execute(
            `SELECT nome, pontuacao FROM alunos ORDER BY pontuacao DESC LIMIT 10;`
        )

        return consulta
    } catch (error) {
        console.log('Ocorreu um erro ao buscar o ranking geral dos alunos:', error)
        throw error

    } finally {
        db.liberarConexao()
    }   

}

module.exports.dadosRespostaAluno = async (idSimulado, userId) => {
    let conexao;

    try {
        conexao = await db.criarConexao()

        const sqlCommand = conexao.format(`select *, q.ques_alternativaCorreta = sr.resposta from simulados s
            inner join questoes_selecionadas qs on s.idsimulado = ? and s.idsimulado = qs.idsimulado
            inner join questoes q on qs.idquestao = q.idquestao 
            left join simulado_resposta sr on qs.idsimulado = sr.idsimulado and qs.idquestao = sr.idquestao 
            and sr.idmatricula = ?
            where q.ques_alternativaCorreta = sr.resposta
            `, [idSimulado, userId]);

        console.log(sqlCommand);

        const [consulta] = await conexao.execute(sqlCommand)

        return consulta;

    } catch (error) {
        console.log('Erro ao capturar os dados de resposta do aluno:', error);
        throw error;
    } finally {
        db.liberarConexao()
    }
}

module.exports.pontuacao = async (idMatricula, userId) => {
    let conexao;

    try {
        conexao = await db.criarConexao()

        const sqlCommand = conexao.format(`select 
        *, 
        q.ques_alternativaCorreta = sr.resposta as correta 
        from simulados s
                   inner join questoes_selecionadas qs on s.idsimulado = 2 and s.idsimulado = qs.idsimulado
                   inner join questoes q on qs.idquestao = q.idquestao
                   left join simulado_resposta sr on qs.idsimulado = sr.idsimulado and qs.idquestao = sr.idquestao
                   and sr.idmatricula = ?
            `, [idMatricula]);





        console.log(sqlCommand);

        const [consulta] = await conexao.execute(sqlCommand)


        console.log(consulta)

        let pontos = 0
        let erros = 0
        let feitas = 0


        for (let i = 0; i < consulta.length; i++) {
            const registro = consulta[i];
            if (registro.correta == 1) {
                switch (registro.ques_triNivel) {
                    case 1:
                        pontos += 15
                        break;
                    case 2:
                        pontos += 10
                        break;
                    case 3:
                        pontos += 5
                        break;
                }
            } else { // resposta incorreta
                erros++
                if (registro.resposta != null) {
                    feitas++
                }
            }
        }

        console.log(`pontuação: ${pontos}`)

        return { total: consulta.length, pontos, erros, feitas };

    } catch (error) {
        console.log('Erro ao capturar os dados de resposta do aluno:', error);
        throw error;
    } finally {
        db.liberarConexao()
    }
}