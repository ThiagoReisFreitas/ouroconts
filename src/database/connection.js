const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

console.log('Verificando variáveis de ambiente:');
console.log('Host:', process.env.MYSQL_HOST);
console.log('User:', process.env.MYSQL_USER);
console.log('Database:', process.env.MYSQL_DATABASE);


module.exports = {
    connection
}