const venom = require('venom-bot');
const banco = require('./script/db.js')
const stages = require('./script/stages')


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
        try{
          if(msg.isGroupMsg === false){
            let currentStage = getStage(msg.from);
            console.log('Stage numero: '+currentStage);
            let resp = await stages.step[currentStage].obj.execute(msg);
            client.sendText(msg.from, resp);
          }
        }catch (e){
            console.log(e);
        }
    });   
}

//teste 
function getStage(user) {
  if (banco.db[user]) {
    //Se existir esse numero no banco de dados
    return banco.db[user].stage;
  } else {
    //Se for a primeira vez que entra e contato
    banco.db[user] = {
      stage: 0
    };
    return banco.db[user].stage;
  }
}