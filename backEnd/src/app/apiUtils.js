const express = require('express')


const apiUtils = {
    /**
     * 
     * @param {express.Response} res 
     * @param {*} dados 
     */
    ok: (res, dados) => {
        res.json({ sucesso: true, dados })
    },

    /**
     * 
     * @param {express.Response} res 
     * @param {string} mensagem 
     */
    erro: (res, mensagem) => {
        res.json({ sucesso: false, mensagem })
    }
}

module.exports = apiUtils;