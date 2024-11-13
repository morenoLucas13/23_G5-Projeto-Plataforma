// ferramentas/pontuacao.js


const yup = require('yup');

// Definindo a pontuação para cada nível de complexidade das questões
const pontuacaoNivelTRI = {
    1: 15, // Fácil
    2: 10, // Médio
    3: 5   // Difícil
};

// Esquema de validação para cada resposta
const respostaSchema = yup.object().shape({
    resposta: yup.number().oneOf([1, 0]).required('A resposta deve ser 0 ou 1'),
    nivelTRI: yup.number().oneOf([1, 2, 3]).required('O nível de acesso deve ser 1, 2 ou 3')
});

// Função para calcular a pontuação total com base nas respostas e nos níveis de complexidade
async function calcularPontuacaoPorResposta(respostas) {
    let pontuacaoTotal = 0;

    for (let i = 0; i < respostas.length; i++) {
        const respostaAtual = respostas[i];

        try {
            // Validando a resposta
            await respostaSchema.validate(respostaAtual);

            // Se a resposta está CORRETA (1), acumula a pontuação
            if (respostaAtual.resposta === 1) {
                const pontos = pontuacaoNivelTRI[respostaAtual.nivelTRI];
                if (pontos) {
                    pontuacaoTotal += pontos;
                }
            }
        } catch (error) {
            console.log(`Erro na validação da resposta ${i + 1}: `, error.message);
        }
    }
    return pontuacaoTotal;
}

module.exports = { calcularPontuacaoPorResposta };
