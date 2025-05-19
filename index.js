const { Client, LocalAuth } = require('wwebjs');
const qrcode = require('qrcode-terminal');
const connection = require('./mysql/connection');
const banco = require('./script/db.js');
const stages = require('./script/stages.js');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  // Exibe o QR Code no terminal
  qrcode.generate(qr, { small: true }, (qrcode) => {
    console.log(qrcode);
  });
});

client.on('ready', () => {
  console.log('✅ CLIENTE CONECTADO!');
});

client.on('disconnected', (reason) => {
  console.log('❌ Cliente desconectado:', reason);
  console.log('🔄 Reconectando em 5 segundos...');
  setTimeout(() => client.initialize(), 5000);
});

client.on('message', async msg => {
  try {
    if (msg._data.id.participant === undefined) {
      let currentStage = getStage(msg.from);
      console.log("Stage numero: " + currentStage);
      let resp = await stages.step[currentStage].obj.execute(msg);
      client.sendMessage(msg.from, resp)
    }
  } catch (e) {
    console.log(e);
  }
});

function getStage(user) {
  if (banco.db[user]) {
    return banco.db[user].stage;
  } else {
    banco.db[user] = {
      stage: 0
    }
    return banco.db[user].stage;
  }
}


console.log('🚀 Iniciando cliente WhatsApp...');
client.initialize().catch(err => {
  console.error('💥 Erro ao iniciar:', err);
  setTimeout(() => client.initialize(), 10000);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando cliente...');
  client.destroy();
  process.exit(0);
});