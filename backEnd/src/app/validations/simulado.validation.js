// Importando o Yup
const yup = require("yup");

// Exportando o schema dos campos para validação em formato de um objeto (JSON)
exports.simuladoValidation = yup.object({
    turma_id: yup.number().required('A turma deve ser selecionada.'),
    descricao: yup.string().required('O campo descrição do simulado é obrigatório.'),
    status: yup.number().oneOf([0, 1], 'O campo simulado ativo deve ser 0 (desativado) ou 1 (ativado).').required('O campo simuladoAtivo é obrigatório.'),
    questoes: yup.array().of(
        yup.object().shape({
            id: yup.number().nullable(), 
            nivel: yup.number().integer().positive('O nível deve ser um número positivo.').when('id', {
                is: null,
                then: yup.number().required('O nível da questão é obrigatório para novas questões.')
            }),
            texto: yup.string().when('id', {
                is: null,
                then: yup.string().required('O texto da questão é obrigatório para novas questões.')
            }),
            enunciado: yup.string().when('id', {
                is: null,
                then: yup.string().required('O enunciado é obrigatório para novas questões.')
            }),
            alternativaA: yup.string().required('A alternativa A é obrigatória.'),
            alternativaB: yup.string().required('A alternativa B é obrigatória.'),
            alternativaC: yup.string().required('A alternativa C é obrigatória.'),
            alternativaD: yup.string().required('A alternativa D é obrigatória.'),
            alternativaE: yup.string().required('A alternativa E é obrigatória.'),
            alternativaCorreta: yup.string().required('A alternativa correta é obrigatória.')
        })
    )
    .required('O campo questoes é obrigatório.') // O array em si não pode ser null
    .min(1, 'É necessário fornecer pelo menos uma questão.')
});

