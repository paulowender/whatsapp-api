require('dotenv').config();
const venom = require('venom-bot');

const notifyZap = async (zap, phone, message) => {
  return zap
    .sendText(phone, message)
    .then((_) => {
      return 'Mensagem enviada com sucesso';
    })
    .catch((erro) => {
      console.error('FALHA AO ENVIAR MENSAGEM: ', erro);
      return erro;
    });
}

const cors = require('cors');
const express = require('express');

const initializeServer = async (whatsappSession) => {
  const app = express();
  const router = express.Router();
  app.use(express.json());
  app.use(cors());

  const buttons = [
    {
      "buttonText": {
        "displayText": "Limpar Logs"
      }
    },
    {
      "buttonText": {
        "displayText": "Parar Servidor"
      }
    }
  ];

  const secretKey = process.env.SECRET_KEY;
  whatsappSession.onMessage(async (message) => {
    if (message.body === 'Menu' && !message.isGroupMsg) {
      // Send Messages with Buttons Reply
      await whatsappSession.sendButtons(message.from, 'Menu', buttons, 'Selecione uma opção')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    const clearLogs = message.body === buttons[1]["buttonText"]["displayText"];
    if (clearLogs) {
      console.clear();
    }

    // const stopServer = message.body === buttons[2]["buttonText"]["displayText"];
    // if (stopServer) {
    //   notifyZap(whatsappSession, message.from, 'Informe o token de segurança:');
    // }

    // if (message.body === secretKey) {
    //   notifyZap('Função indisponível');
    // }
  })

  const guard = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' && req.headers.authorization.split(' ')[1] === secretKey) {
      next();
    } else {
      res.status(401).json({ message: 'Token inválido' });
    }
  }

  router.post('/send', guard, (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
      res.json({
        message: 'Parâmetros inválidos',
      });
      return;
    }

    const cID = `${phone}@c.us`;
    notifyZap(whatsappSession, cID, message).then((msg) => {
      res.json({
        message: msg
      })
    })
  })

  router.get('/api', (req, res) => {
    res.json({
      "name": "Whastapp-API",
      "version": "1.2",
    });
  })

  app.use('/', router);

  const port = 3000;
  console.clear();
  app.listen(port, () => console.log(`WHASAPP API listening on port ${port}!`));
}

let sessionName = process.env.SESSION_NAME;
if (!sessionName) {
  sessionName = 'localSession';
}
venom
  .create({ session: sessionName })
  .then(initializeServer)
  .catch((erro) => {
    console.log(erro);
  });
