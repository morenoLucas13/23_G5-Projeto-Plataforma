module.exports = function midLogConsole(req, res, next) {
    let data = new Date()
    console.log('\n \n --------------------')
    console.log('--- Atendendo rota em ', data.toISOString())
    console.log('--- Método: ', req.method)
    console.log('--- Endereço: ', req.url)
    console.log('--- Parâmetros: ', JSON.stringify(req.params, null, ' ', 2))
    console.log('--- Corpo: ', JSON.stringify(req.body, null, ' ', 2))


    
    next() // Chama o próximo middlewares que estiver empilhado
}