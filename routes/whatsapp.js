import express from "express";
// import { getChats, sendMensagem, } from "../controllers/mensagens";

// Imports do zap
// import Client from 'whatsapp-web';
// var qrcode = require('qrcode-terminal');

// require('dotenv').config();

// const zap = new Client();
// zap.initialize();

// const dataFile = './data/data.json';
// const logFile = './data/log.txt';


// zap.on('qr', (qr) => {
//     // Generate and scan this code with your phone
//     console.clear();
//     console.log('QR RECEIVED');
//     qrcode.generate(qr, { small: true });
// });

// var whatsappRead = false;
// zap.on('ready', () => {
//     console.clear();
//     console.log('Zap is ready!');
//     whatsappRead = true;
//     notifyZap("Bot de monitoramento whatsapp iniciado");
// });

// const notifyZap = async (message) => {
//     if (!whatsappRead) {
//         return;
//     }

//     try {
//         await zap.sendMessage(process.env.WHATSAPP_DESTINATION_ID, message);
//     } catch (err) {
//         console.log('Zap error: ' + err);
//     }
// }

// const saveData = (data) => {
//     try {
//         fs.writeFileSync(dataFile, JSON.stringify(data));
//     } catch (err) {
//         console.log(err);
//     }
// }

// const log = (line) => {
//     try {
//         fs.appendFileSync(logFile, line + '\n');
//         console.log(line);
//     } catch (err) {
//         console.log(err);
//     }
// }

// if (!process.env.API_ID || !process.env.API_HASH || !process.env.PHONE) {
//     console.log("Please set API_ID, API_HASH and PHONE environment variables.");
//     console.log("To get an API_ID, go to https://my.telegram.org/apps");
//     process.exit(1);
// }

// const apiId = Number(process.env.API_ID);
// const apiHash = process.env.API_HASH;
// const phone = process.env.PHONE;
// const sessionKey = data["sessionKey"];
// const stringSession = new StringSession(sessionKey);

const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    })
})

// router.post("/", sendMensagem)

export default router