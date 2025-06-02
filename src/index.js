const venom = require('venom-bot');
const banco = require('./script/db.js');
const stages = require('./script/stages.js');
const connection = require('./models/tb_usuario.js');
require('dotenv').config();


venom
    .create({
        session: 'ouroconts',
        headless: "new",
        BrowserPath: '/usr/bin/google-chrome',
        args: [
            '--no-sandbox',
            "--disable-setuid-sandbox",
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
        ]
    })
    .then((client) => start(client))
    .catch((error) => {
        console.error('Error creating Venom client:', error);
    }
);



function start(client) {
    console.log('Iniciando o Bot...');
    client.onMessage(async (msg) => {
      //console.log('Mensagem recebida:', msg);
      try{
        if(!msg.isGroupMsg && msg.from === process.env.NUMERO_WHATS){
          //let currentStage = getStageObjeto(msg);
          let currentStage = await getStageBanco(msg);
          console.log('Stage numero: '+currentStage);
          let resp = await stages.step[currentStage].obj.execute(msg);
          client.sendText(msg.from, resp);
        }
        }catch (e){
            console.log(e);
        }
    });   
}

function getStageObjeto(user) {
  if(banco.db[user.from]){
    return banco.db[user.from].stage;
  }
  else{
    banco.db[user.from] ={
      stage: 0, 
      whats: user.from,
      nome: user.notifyName,
      email: "",
      saldo_atual: 0
    }
    return banco.db[user.from].stage;
  }
}


async function getStageBanco(user){
  const dataUser = await connection.getUsuario(user.from);
  if(dataUser.length > 0){
    return dataUser[0].stage;
  } else {
    dadosPadrao = {
      nome: user.notifyName,
      stage: 0,
      whats: user.from,
      email: "",
      saldo_atual: 0
    };
    dataUser = await connection.setUsuarioPadrao(dadosPadrao);
    return dataUser[0].stage;
  }
}