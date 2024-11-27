//  Importando o Banco de Dados para gerenciar as conexões
const db = require('../db/')

//  Importando módulo do express
const express = require('express')

//  Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router()

//  Importando o Model
const model = require('../models/loginModel')


// Importando os middlewares e funções necessárias pra autenticação
const { gerarToken, gerarRedefinicaoToken } = require('../ferramentas/token')
const midVerificarJWToken = require('../middlewares/midVerificarJWToken')
const { userValidationLogin } = require('../validations/user.validation')


//  Rota de acesso à API para verificação das credenciais do login
rotas.post('/', async (req, res) => {
    console.log(req.body);

    try {
        // Validando o body da requisição com Yup
        await userValidationLogin.validate(req.body, { abortEarly: false })
    } catch (error) {
        return res.status(200).json({ sucesso: false, erros: error.errors })
    }

    try {
        const { email, senha } = req.body

        // Verificando se o email e senha estão corretos
        let objValidacao = await model.login(email, senha)

        if (objValidacao.sucesso) {
            // Extraindo o id de objValidacao
            const token = gerarToken(objValidacao.id, objValidacao.nivel_acesso)
            // Gerando o token JWT incluindo o nível
            const redefinirToken = gerarRedefinicaoToken(objValidacao.id)

            return res.json({ sucesso: true, token, redefinirToken })
        } else {
            return res.status(200).json({ sucesso: false, erro: "Erro: Dados inseridos incorretos!" })
        }
    } catch (error) {
        res.status(500).json({ sucesso: false, erro: 'Erro: Problemas ao comunicar com o servidor :(' })
        console.log(error)
    }
});

console.log('Fim da rota POST de Login!');
;

// Rota para logout de acesso à API
rotas.post('/logout', midVerificarJWToken.verifyToken, (req, res) => {
    res.status(200).json({
        auth: false,
        token: null,
        mensagem: "Logout realizado com sucesso!"
    });
});

// Rota para cadastrar um novo professor e gerando um token automaticamente
const { userValidationCadastro } = require("../validations/user.validation");

rotas.post('/cadastrarUser', async (req, res) => {
    const { nome, email, senha, nivelAcesso, disciplinasAula } = req.body;

    try {
        // Validando o corpo da requisição
        await userValidationCadastro.validate(req.body, { abortEarly: false });
    } catch (error) {
        return res.status(400).json({ sucesso: false, erros: error.errors });
    }

    try {
        // Verificando se o email já existe no banco de dados
        const emailExistente = await model.verificarEmailExistente(email);
        if (emailExistente) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Ops! Outro usuário já está cadastrado com o email informado!',
            });
        }

        let novoUser;

        if (nivelAcesso === 2) {
            // Cadastrar professor
            novoUser = await model.cadastrarProfessor(nome, email, senha, nivelAcesso, disciplinasAula);
        } else if (nivelAcesso === 1) {
            // Cadastrar aluno
            novoUser = await model.cadastrarAluno(nome, email, senha, nivelAcesso);
        } else {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nível de acesso inválido. Deve ser 1 (Aluno) ou 2 (Professor).',
            });
        }

        // Gerar token JWT após o cadastro
        const token = gerarToken(novoUser.id, nivelAcesso);

        // Retornar o novo usuário e seu respectivo token
        return res.status(201).json({ sucesso: true, usuario: novoUser, token: token });

    } catch (error) {
        console.error('Erro ao cadastrar novo usuário:', error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar novo usuário :(' });
    }
});




// Rota para obter informações do usuário por meio do ID
rotas.get('/dadosUser', midVerificarJWToken.verifyToken, async (req, res) => {
    try {
        // Obtendo o id e o nível de acesso a partir do token, armazenado em req.userId e req.nivel_acesso
        const idUser = req.userId;
        const nivelAcesso = req.nivel_acesso;

        // Chamando a model para exibir os dados do usuário usando o ID e o nível de acesso do token
        const dadosUser = await model.exibirDadosUser(idUser, nivelAcesso);

        // Retornando os valores obtidos em formato JSON
        res.json(dadosUser);
    } catch (error) {
        console.log('Ops! Erro ao acessar as informações do usuário :(', error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter detalhes do usuário!' });
    }
    console.log('Fim da rota GET de exibição dos dados do usuário!');
});



// Rota TESTE para uso do Token se ele é válido incluindo middlewares
rotas.post('/verificarToken', midVerificarJWToken.verifyToken, (req, res) => {
    res.json({
        sucesso: true,
        mensagem: 'O token informado é válido!'
    });
});

// Rota TESTE para uso do Token devolvendo uma lista caso seja válido incluindo middlewares
rotas.post('/listar', midVerificarJWToken.verifyToken, (req, res) => {
    let elencoTVD = [
        { "nome": "Elena", "sobrenome": "Gilbert" },
        { "nome": "Stefan", "sobrenome": "Salvatore" },
        { "nome": "Damon", "sobrenome": "Salvatore" },
        { "nome": "Caroline", "sobrenome": "Forbes" },
        { "nome": "Bonnie", "sobrenome": "Bennett" }
    ]

    res.json({ elencoTVD });
});

//  Exportando as rotas
module.exports = rotas
