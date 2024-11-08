// ! Banco de Dados
const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: '10.132.224.59',
    user: 'alana',
    password: 'senha', 
    database: 'bd_plataforma',
    port: 3306,
    timezone: '+00:00'
});

function criarConexao() {
    return pool.getConnection()

}

function liberarConexao(conexao){
    if (conexao) {
        conexao.release()
    } 
}

module.exports = {
    criarConexao,
    liberarConexao
}