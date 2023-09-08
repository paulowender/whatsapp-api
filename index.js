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

const initializeServer = async (zap) => {
  const app = express();
  const router = express.Router();
  app.use(express.json());
  app.use(cors());

  const buttons = [
    {
      "buttonText": {
        "displayText": "Text of Button 1"
      }
    },
    {
      "buttonText": {
        "displayText": "Text of Button 2"
      }
    }
  ];

  zap.onMessage(async (message) => {
    if (message.body === 'Hi' && !message.isGroupMsg) {
      // Send Messages with Buttons Reply
      await zap.sendButtons(message.from, 'Title', buttons, 'Description')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  })

  const secretKey = process.env.SECRET_KEY;
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
    notifyZap(zap, cID, message).then((msg) => {
      res.json({
        message: msg
      })
    })
  })

  app.use('/', router);

  const port = 3000;
  app.listen(port, () => console.log(`WHASAPP API listening on port ${port}!`));
}


venom
  .create({
    session: 'Papelaria Realce'
  })
  .then(initializeServer)
  .catch((erro) => {
    console.log(erro);
  });
