// middlewares/midVerificarDuplicidade.js
const model = require('../models/questoesModel');

module.exports.verificarDuplicidade = async (req, res, next) => {
  const { enunciado } = req.body;

  try {
    // Verificando se já existe uma questão com o mesmo enunciado
    const questaoExistente = await model.buscarQuestaoPorEnunciado(enunciado);

    if (questaoExistente) {
      return res.status(409).json({ erro: 'Questão duplicada! Já existe uma questão com esse enunciado!' });
    }

    next();
  } catch (error) {
    console.error('Erro ao verificar duplicidade de questão:', error);
    res.status(500).json({ erro: 'Erro interno ao verificar duplicidade.' });
  }
};
