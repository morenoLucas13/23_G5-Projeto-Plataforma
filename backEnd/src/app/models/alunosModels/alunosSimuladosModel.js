// ALUNOS SIMULADOS MODEL

const db = require('../../db')

// Exibir simulados agendados 
module.exports.obterSimuladosAgendados = async () => {
    let conexao;

    try {
        conexao = await db.criarConexao();

        const [consulta] = await conexao.execute(
            `
            SELECT 
                s.idsimulado,
                s.simu_descricao,
                p.us_nome,
                d.dis_nome,  
                s.simu_dataCriacao
            FROM 
                simulados s
            JOIN 
                professor p ON s.idprofessor = p.idprofessor
            JOIN 
                disciplinas d ON p.idprofessor = d.idprofessor;
            `
        );

        let retornoConsulta = consulta.map(item => (
            {
                id: item.idsimulado,
                descricao: item.simu_descricao,
                professor: item.us_nome,
                disciplina: item.dis_nome,
                data_criacao: item.simu_dataCriacao
            })
        )

        return retornoConsulta;


    } catch (error) {
        console.log('Ocorreu um erro ao buscar simulados agendados:', error);
        throw error;

    } finally {
        db.liberarConexao()
    }
};

// Buscar questões de um simulado para responder
module.exports.buscarQuestoesDoSimulado = async (idSimulado) => {
    let conexao;
    try {
        conexao = await db.criarConexao();
        const [consultaQuestoesSimulado] = await conexao.execute(
            `SELECT 
                q.idquestao AS id,
                q.ques_textoQuestao AS textoQuestao,
                q.ques_enunciado AS enunciado, 
                q.ques_alternativaA AS alternativaA,
                q.ques_alternativaB AS alternativaB,
                q.ques_alternativaC AS alternativaC,
                q.ques_alternativaD AS alternativaD,
                q.ques_alternativaE AS alternativaE,
                q.ques_alternativaCorreta AS alternativaCorreta
            FROM 
                questoes q
            INNER JOIN 
                questoes_selecionadas qs ON q.idquestao = qs.idquestao
            WHERE 
                qs.idsimulado = ?;`,

            [idSimulado]
        );

        console.log('ID do Simulado no Model:', idSimulado);
        console.log('Consulta SQL:', consultaQuestoesSimulado);


        return consultaQuestoesSimulado;
    } catch (error) {
        console.error('Erro ao buscar questões no banco de dados:', error);
        throw error;
    } finally {
        db.liberarConexao();
    }
};

