// middlewares/midBloquearAcessoPorNivel.js

// STATUS CODE
// 401 - Acesso negado devido à falta de chave de assinatura
// 403 = O acesso a um recurso é proibido para o cliente

module.exports.autorizarNivel = (nivelRequerido) => {
    return (req, res, next) => {
        // Verificando se o nível de acesso do usuário está presente no cabeçalho da requisição
        if (!req.nivel_acesso) {
            return res.status(401).json({ auth: false, mensagem: 'Usuário não autenticado!' })
        }

        // Comparando o nível de acesso do usuário com o nível requerido
        if (req.nivel_acesso !== nivelRequerido) {
            return res.status(403).json({auth: false, mensagem: 'Acesso negado! Nível de acesso insuficiente.'})
        }

        // Se tudo estiver ok, prossegue para o próximo middleware/controller
        next()
    }
}

