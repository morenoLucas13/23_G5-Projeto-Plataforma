// // SIMULADOS MODEL

// const db = require('../db/')

// // Exibição dos simulados que precisam ser feitos
// module.exports.exibirSimuladosAgendados = async () => {
//     let conexao;

//     try {
//         conexao = await db.criarConexao();
//         const [resultados] = await conexao.execute(
//             'SELECT * FROM gerarsimulados;'
//         );

//         return resultados;

//     } catch (error) {
//         console.log('Erro de SQL ao executar a exibição dos simulados a serem feitos!');
//         throw error;
//     } finally {
//         db.liberarConexao(conexao); // Garantindo que a conexão seja liberada corretamente
//     }
// };




