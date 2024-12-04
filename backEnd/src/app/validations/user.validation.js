// Importando o Yup
const yup = require("yup")

// Exportando o schema dos campos para validação em formato de um objeto (JSON)
exports.userValidationLogin = yup.object({
    email: yup.string().required('O campo email é obrigatório.').email('Email deve ser um endereço válido.'),
    senha: yup.string().required('O campo senha é obrigatório.').min(7, 'A senha deve ter pelo menos 7 caracteres.'),
});

exports.userValidationCadastro = yup.object({
    nome: yup.string().required("O campo nome é obrigatório."),
    email: yup
        .string()
        .required("O campo email é obrigatório.")
        .email("Email deve ser um endereço válido."),
    senha: yup
        .string()
        .required("O campo senha é obrigatório.")
        .min(7, "A senha deve ter no mínimo 7 caracteres."),
    nivel_acesso: yup
        .number()
        .required("O campo nível de acesso é obrigatório.")
        .oneOf([1, 2], "O nível de acesso deve ser 1 (Aluno) ou 2 (Professor)."),
    disciplinasAula: yup
        .array()
        .of(yup.number())
        .when("nivel_acesso", {
            is: 2, // Somente para professores
            then: yup
                .array()
                .of(yup.number())
                .required("O campo disciplinasAula é obrigatório para professores.")
                .min(1, "O campo disciplinasAula deve conter pelo menos uma disciplina."),
            otherwise: yup.array().nullable(), // Alunos não precisam desse campo
        }),
    turma: yup
        .string()
        .when("nivel_acesso", {
            is: 1, // Somente para alunos
            then: yup.string().required("O campo turma é obrigatório para alunos."),
            otherwise: yup.string().nullable(), // Professores não precisam desse campo
        }),
    matricula: yup
        .string()
        .when("nivel_acesso", {
            is: 1, // Somente para alunos
            then: yup.string().required("O campo matrícula é obrigatório para alunos."),
            otherwise: yup.string().nullable(), // Professores não precisam desse campo
        }),
});


