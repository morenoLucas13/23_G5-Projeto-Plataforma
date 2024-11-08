//  Importando o Banco de Dados para gerenciar as conexões
const db = require('../db/')

//  Importando módulo do express
const express = require('express')

//  Usa-se Router para ser um gerenciador das rotas no Controller
const rotas = express.Router()

const model = require('../models/rankingModel')

rotas.get('rankingGeral', async (req, res) => {
    
})



module.exports = rotas
