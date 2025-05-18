const { Client, LocalAuth } = require('wwebjs');
const qrcode = require('qrcode-terminal');

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
    if(msg.body === '!ping') {
        await msg.reply('pong!');
    }

    if (msg.body === '!info') {
        await msg.reply(`Bot funcionando todo fudido!\n ${new Date().toDateString()}`)
    }
});


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