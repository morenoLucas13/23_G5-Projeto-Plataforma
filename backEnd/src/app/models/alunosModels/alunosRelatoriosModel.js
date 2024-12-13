// RANKING MODEL

const db = require('../../db')
const appUtils = require('../../appUtils');

// Exibir o ranking geral dos 10 melhores alunos a partir de suas pontuações
module.exports.obterRankingGeral = async () => {
    let conexao;
    try {
        conexao = await db.criarConexao();

        // Log para verificar conexão e SQL
        console.log('Conexão estabelecida para obter ranking geral.');

        const [consulta] = await conexao.execute(`
            SELECT nome, pontuacao 
            FROM alunos 
            ORDER BY pontuacao DESC 
            LIMIT 10;
        `);

        console.log('Dados do ranking:', consulta);

        return consulta;
    } catch (error) {
        console.error('Erro no Model ao obter ranking:', error);
        throw new Error('Erro ao buscar o ranking no banco de dados.');
    } finally {
        db.liberarConexao()
    }
};

module.exports.dadosRespostaAluno = async (idSimulado, userId) => {
    let conexao;

    try {
        conexao = await db.criarConexao();

        const sqlCommand = conexao.format(`
            SELECT q.*, 
                   sr.resposta,
                   q.ques_alternativaCorreta = sr.resposta AS correta
            FROM simulados s
            INNER JOIN questoes_selecionadas qs ON s.idsimulado = qs.idsimulado
            INNER JOIN questoes q ON qs.idquestao = q.idquestao
            LEFT JOIN simulado_resposta sr ON qs.idsimulado = sr.idsimulado 
                                            AND qs.idquestao = sr.idquestao 
                                            AND sr.idmatricula = ?
            WHERE s.idsimulado = ?
        `, [idSimulado, userId]);

        const [consulta] = await conexao.execute(sqlCommand);

        return consulta;
    } catch (error) {
        console.error('Erro ao capturar dados da resposta do aluno:', error);
        throw error;
    } finally {
        db.liberarConexao();
    }
};

module.exports.pontuacao = async (userId, idSimulado, respostas) => {
    let conexao;

    try {
        conexao = await db.criarConexao();

        const sqlCommand = conexao.format(`
            SELECT 
                qs.idsimulado, 
                qs.idquestao, 
                q.ques_alternativaCorreta as alternativaCorreta,
                q.ques_triNivel as nivel
            FROM simulados s
            INNER JOIN questoes_selecionadas qs ON s.idsimulado = qs.idsimulado
            INNER JOIN questoes q ON qs.idquestao = q.idquestao
            WHERE s.idsimulado = ?
        `, [idSimulado]);

        const [consulta] = await conexao.execute(sqlCommand);

        // consulta[0].
        appUtils.printObject(consulta);
        appUtils.printObject(respostas, "Respostas Aluno");


        let pontos = 0;
        let erros = 0;

        consulta.forEach((q, i) => {

            let q_resposta = respostas.find((r) => r.id == q.idquestao)

            // verifica se acertou a questão
            if (q.alternativaCorreta == q_resposta.resposta) { // acertou a questão
                switch (q.nivel) {
                    case 1: pontos += 15;
                        break;
                    case 2: pontos += 10;
                        break;
                    case 3: pontos += 5;
                        break;
                }
            } else { // errou a questao
                erros++;
            }
        });



        return ({ total: consulta.length, pontos, erros });

        // let pontos = 0, erros = 0, feitas = 0;

        // for (const registro of consulta) {
        //     if (registro.correta) {
        //         switch (registro.ques_triNivel) {
        //             case 1: pontos += 15; break;
        //             case 2: pontos += 10; break;
        //             case 3: pontos += 5; break;
        //         }
        //     } else if (registro.resposta) {
        //         feitas++;
        //         erros++;
        //     }
        // }

        // return { total: consulta.length, pontos, erros, feitas };
    } catch (error) {
        console.error('Erro ao calcular pontuação:', error);
        throw error;
    } finally {
        db.liberarConexao();
    }
};

// module.exports.pontuacao = async (userId, idSimulado) => {
//     let conexao;

//     try {
//         conexao = await db.criarConexao()

//         const sqlCommand = conexao.format(`select
//         *,
//         q.ques_alternativaCorreta = sr.resposta as correta
//         from simulados s
//                    inner join questoes_selecionadas qs on s.idsimulado = 2 and s.idsimulado = qs.idsimulado
//                    inner join questoes q on qs.idquestao = q.idquestao
//                    left join simulado_resposta sr on qs.idsimulado = sr.idsimulado and qs.idquestao = sr.idquestao
//                    and sr.idmatricula = ?
//             `, [idSimulado, userId]);

//         console.log(sqlCommand);

//         const [consulta] = await conexao.execute(sqlCommand)


//         console.log(consulta)

//         let pontos = 0
//         let erros = 0
//         let feitas = 0


//         for (let i = 0; i < consulta.length; i++) {
//             const registro = consulta[i];
//             if (registro.correta == 1) {
//                 switch (registro.ques_triNivel) {
//                     case 1:
//                         pontos += 15
//                         break;
//                     case 2:
//                         pontos += 10
//                         break;
//                     case 3:
//                         pontos += 5
//                         break;
//                 }
//             } else { // resposta incorreta
//                 erros++
//                 if (registro.resposta != null) {
//                     feitas++
//                 }
//             }
//         }

//         console.log(`pontuação: ${pontos}`)

//         return { total: consulta.length, pontos, erros, feitas };

//     } catch (error) {
//         console.log('Erro ao capturar os dados de resposta do aluno:', error);
//         throw error;
//     } finally {
//         db.liberarConexao()
//     }
// }