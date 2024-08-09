module.exports = function midLogConsole(req, res, next) {
    let data = new Date()
    console.log('\n \n --------------------')
    console.log('--- Atendendo rota em ', data.toISOString())
    console.log('--- Método: ', req.method)
    console.log('--- Endereço: ', req.url)
    console.log('--- Parâmetros: ', req.params)
    console.log('--- Corpo: ', req.body)




    
    next() // Chama o próximo middlewares que estiver empilhado
}