const banco = require('../db.js');

const texto = "Eai meu nobre oque que cê quer? \n\n1 - Alterar *dados cadastrais*\n2 - Registrar *movimentações financeiras*\n3 - Resumo financeiro/graficos"; 

async function execute(msg){
    banco.db[msg.from].stage = 1;

    return texto;
}
module.exports = execute;