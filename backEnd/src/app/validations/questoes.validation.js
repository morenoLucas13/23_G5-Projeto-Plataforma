// Importando o Yup
const yup = require("yup");

// Exportando o schema dos campos para validação em formato de um objeto (JSON)
exports.questoesValidation = yup.object({
    disciplina_id: yup
        .number()
        .required('Selecione uma disciplina.'),
    
    nivel: yup
        .string()
        .required('Informe o nível da questão.'),
    
    texto: yup
        .string()
        .required('O texto da questão é obrigatório.'),
    
    enunciado: yup
        .string()
        .required('O enunciado é obrigatório.'),
    
    alternativaA: yup
        .string()
        .required('A alternativa A é obrigatória.'),
    
    alternativaB: yup
        .string()
        .required('A alternativa B é obrigatória.'),
    
    alternativaC: yup
        .string()
        .required('A alternativa C é obrigatória.'),
    
    alternativaD: yup
        .string()
        .required('A alternativa D é obrigatória.'),
    
    alternativaE: yup
        .string()
        .required('A alternativa E é obrigatória.'),
    
    alternativaCorreta: yup
        .string()
        .oneOf(['A', 'B', 'C', 'D', 'E'], 'A resposta correta deve ser uma das alternativas (A, B, C, D ou E).')
        .required('A resposta correta deve ser informada.')
});

