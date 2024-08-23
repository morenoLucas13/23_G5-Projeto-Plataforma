//  Importando o Banco de Dados para gerenciar as conexões
const db = require('../db/')

//  Importando módulo do express
const express = require('express')

//  Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router()

//  Importando o Model
const model = require('../models/loginModel')

// Middleware para analisar o corpo da requisição como JSON
rotas.use(express.json())

// Importando a função que valida os campos
const { userValidationLogin } = require("../validations/user.validation")

//  Criando a rota de acesso à API para verificação das credenciais do login
rotas.post('/', async (req, res) => {
    console.log(req.body);

    try {
        // Validando o body da requisição
        await userValidationLogin.validate(req.body, { abortEarly: false });

        // Desestruturando as propriedades corretas
        const { email, senha } = req.body;

        let objValidacao = await model.login(email, senha);

        if (objValidacao.sucesso) {
            res.json(objValidacao);
        } else {
            res.status(401).json({ sucesso: false, erro: "Erro: Dados inseridos incorretos!" });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ sucesso: false, erros: error.errors });
        } else {
            res.status(500).json({ sucesso: false, erro: 'Erro: Problemas ao comunicar com o servidor :(' });
            console.log(error);
        }
    }

    console.log('Fim da rota POST de Login!');
});


// Rota para cadastro de novos usuários
const { userValidationCadastro } = require("../validations/user.validation")
rotas.post('/cadastrarUser', async (req, res) => {
    const { nome, email, senha, nivel_acesso } = req.body;
    console.log(req.body);

    try {
        // Validando o body da requisição
        await userValidationCadastro.validate(req.body, { abortEarly: false });

        // Chamando a função do model para salvar o usuário no banco de dados
        const novoUser = await model.cadastrarUser(nome, email, senha, nivel_acesso);
        res.json({ sucesso: true, usuario: novoUser });

        console.log('Dados recebidos: ', { nome, email, senha, nivel_acesso });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ sucesso: false, erros: error.errors });
        } else {
            res.status(500).json({ sucesso: false, erro: 'Erro: Problemas ao comunicar com o servidor :(' });
            console.log(error);
        }
    }
    console.log('Fim da rota POST de Cadastro!');
});

// Rota para obter informações do usuário
rotas.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        res.json(await model.exibirDadosUser(id))
    } catch (error) {
        console.log('Ops! Erro ao acessar as informações do usuário :(')
        res.status(500).json({ sucesso: false, erro: 'Erro ao obter detalhes do usuário!' })
    }
    console.log('Fim da rota GET de exibição dos dados do usuário!')
})




//  Exportando as rotas
module.exports = rotas