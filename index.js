require('dotenv').config();

const { Client } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');

const zap = new Client();
zap.initialize();

zap.on('loading_screen', (percent, message) => {
    console.clear();
    console.log('LOADING ...', percent, message);
});

zap.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.clear();
    console.log('LEIA O QR RECEBIDO COM O DISPOSITIVO ONDE ESTÁ O WHATSAPP QUE IRÁ ENVIAR AS MENSAGEMS');
    qrcode.generate(qr, { small: true });
})

var whatsappRead = false;
zap.on('ready', () => {
    console.clear();
    console.log('WHATSAPP PRONTO, INICIANDO API...');
    whatsappRead = true;
    initializeServer();
})

zap.on('message', (message) => {
    if (message.body.includes('API TEST') || message.body.includes('ping')) {
        message.reply('pong');
        console.log('MENSAGEM RECEBIDA: ', message);
    } else if (message.body.includes('clear logs')) {
        console.clear();
        message.reply('Logs limpos');
    }
})

const notifyZap = async (phone, message) => {
    try {
        const to = `${phone}@c.us`;
        console.log('Enviando para: ', to, ' Mensagem: ', message);
        await zap.sendMessage(to, message);
        return 'Mensagem enviada com sucesso';
    } catch (err) {
        console.log('FALHA AO ENVIAR MENSAGEM:' + err);
        return err;
    }
}

const cors = require('cors');
const express = require('express');


const initializeServer = async () => {
    const app = express();
    const router = express.Router();
    app.use(express.json());
    app.use(cors());

    router.post('/', (req, res) => {
        const { phone, message } = req.body;
        notifyZap(phone, message).then((msg) => {
            res.json({
                message: msg
            })
        })
    })

    app.use('/', router);

    const port = 3000;
    app.listen(port, () => console.log(`WHASAPP API listening on port ${port}!`));
}