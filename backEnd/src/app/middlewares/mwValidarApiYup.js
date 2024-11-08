// Middleware genérico de validação

// Tipos de requisição:
// Query Params (GET)
// Route Params (GET)
// Body Params (POST e PUT)


module.exports.validaEsquemaYupBody = (schema) => {
    return async (req, res, next) => {
        try {
            // Valida os dados da requisição
            await schema.validate(req.body);
            next(); // Se a validação passar, chama o próximo middleware ou rota
        } catch (error) {
            // Se a validação falhar, retorna um erro
            res.status(400).json({ sucesso: false, error: error.errors });
        }
    };
};

module.exports.validaEsquemaYupParams = (schema) => {
    return async (req, res, next) => {
        try {
            // Valida os dados da requisição
            await schema.validate(req.params);
            next(); // Se a validação passar, chama o próximo middleware ou rota
        } catch (error) {
            // Se a validação falhar, retorna um erro
            res.status(400).json({ sucesso: false, error: error.errors });
        }
    };
};

module.exports.validaEsquemaYupQuery = (schema) => {
    return async (req, res, next) => {
        try {
            // Valida os dados da requisição
            await schema.validate(req.query);
            next(); // Se a validação passar, chama o próximo middleware ou rota
        } catch (error) {
            // Se a validação falhar, retorna um erro
            res.status(400).json({ sucesso: false, error: error.errors });
        }
    };
};


