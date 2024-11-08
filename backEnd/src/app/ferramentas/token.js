// ferramentas/generateToken.js

const jwt = require('jsonwebtoken')

module.exports.gerarToken = (id, nivel_acesso) => {
    if (!process.env.SECRET) {
        throw new Error('A SECRET não está definida no arquivo .env');
      }

    const token = jwt.sign({ id, nivel_acesso }, process.env.SECRET, {
        expiresIn: 3600 // Configurando esse token para expirar em 1hs
    })

    return token
}

module.exports.gerarRedefinicaoToken = (id) => {
    if (!process.env.REFRESH_SECRET) {
        throw new Error('A chave REFRESH_SECRET não está definida no arquivo .env. Verifique sua configuração.');
    }

    const redefinirToken = jwt.sign({id}, process.env.REFRESH_SECRET, {
        expiresIn: '30d' // Configurando esse token para expirar após 30 dias
    })

    return redefinirToken
}
