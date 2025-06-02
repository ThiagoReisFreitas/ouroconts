const {connection} = require('../database/connection.js');
require('dotenv').config({path:'../../.env'});

async function setUsuarioPadrao(usuario){
    try{
        const [rows] = await connection.execute('INSERT INTO tb_usuario (nome,stage, whats) VALUES (?,?,?)',[usuario.nome, usuario.stage, usuario.whats]);    
        console.log('Usuário inserido com sucesso:', rows);
        return rows;
    }catch (error) {
        console.error('Erro ao inserir usuário:', error);
    }
}

async function setUsuarioCadastro(usuario){
    try{
        const [rows] = await connection.execute('UPDATE tb_usuario SET email = ?, saldo_atual = ? WHERE whats = ?',[usuario.email, usuario.saldo_atual, usuario.whats]);
        console.log('Usuário atualizado com sucesso:', rows);
        return rows;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
    }
}

async function getUsuario(whats){
    try{
        console.log('Host:', process.env.MYSQL_HOST);
        const [rows] = await connection.execute('SELECT * FROM tb_usuario WHERE whats = ?',[whats]);
        console.log('Usuário encontrado:', rows);
        return rows;
    }catch (error) {
        console.error('Erro ao buscar usuário:', error);
    }
}

module.exports = {
    setUsuarioPadrao,
    setUsuarioCadastro,
    getUsuario
};