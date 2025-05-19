const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST ,
    user: process.env.MYSQL_USER  ,
    password: process.env.MYSQL_PASSWORD ,
    database: process.env.MYSQL_DATABASE ,
});

async function inserirUsuario(usuario){
    try{
        const [rows] = await connection.execute('INSERT INTO tb_ouroconts (nome,whats) VALUES (?,?)',[usuario.nome, usuario.whats]);
        console.log('Usuário inserido com sucesso:', rows);
    }catch (error) {
        console.error('Erro ao inserir usuário:', error);
    }
}

async function buscarUsuario(usuario){
    try{
        const [rows] = await connection.execute('SELECT * FROM tb_ouroconts WHERE whats = ?',[usuario.whats]);
        console.log('Usuário encontrado:', rows);
        return rows;
    }catch (error) {
        console.error('Erro ao buscar usuário:', error);
    }
}

module.exports = {
    inserirUsuario,
    buscarUsuario
}