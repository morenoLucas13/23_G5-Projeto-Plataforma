// middlewares/midVerificarJWToken.js
const jwt = require('jsonwebtoken');

const midVerificarJWToken = {};

midVerificarJWToken.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ auth: false, mensagem: 'Nenhum token fornecido!' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ auth: false, mensagem: 'Falha na autenticação do token!' });
    }

    console.log("Uid" + JSON.stringify(decoded, null, 2))

    // * PROPOSTAS: 
    // * verificar no token se é aluno ou professor
    // * se aluno adicionar na requisição a variavel id_aluno
    // * se é professor adicionar na requisição a variavel id_aluno


    // Verificando se o usuário é aluno ou professor com base no nível de acesso
    // Usa-se === para igualdade estrita
    // Só retorna true quando as variáveis são do mesmo tipo e valor
    if (decoded.nivel_acesso === 2) { // 2 = aluno
      req.id_aluno = decoded.id
    } else if (decoded.nivel_acesso === 1) { // 1 = professor
      req.id_professor = decoded.id
    } else {
      return res.status(401).json({ auth: false, mensagem: 'Acesso inválido!' })
    }

    // Se tudo estiver ok, salva a informação do ID do usuário e o seu respectivo nivel de acesso no request
    req.userId = decoded.id;
    req.nivel_acesso = decoded.nivel_acesso
    next();
  });
};

module.exports = midVerificarJWToken