// Importando o Yup
const yup = require("yup")

// Importando o schema dos campos para validação em formato de um objeto (JSON)
exports.userValidationLogin = yup.object({
    email: yup.string().required('O campo email é obrigatório.').email('Email deve ser um endereço válido.'),
    senha: yup.string().required('O campo senha é obrigatório.').min(7, 'A senha deve ter pelo menos 7 caracteres.'),
});

exports.userValidationCadastro = yup.object({
    nome: yup.string().required("O campo nome é obrigatório."),
    email: yup.string().required('O campo email é obrigatório.').email('Email deve ser um endereço válido.'),
    senha: yup.string().required('O campo senha é obrigatório.').min(7, 'A senha deve ter pelo menos 7 caracteres.'),
    nivel_acesso: yup.number().required("O campo de nível de acesso é obrigatório.").oneOf([1, 2], "O nível de acesso deve ser 1 ou 2.")
})

