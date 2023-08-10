export const getChats = (_, res) => {
  return res.status(200).json({
    message: "Chats"
  });
};

export const getMensagens = (req, res) => {
  return res.status(200).json({
    message: "Mensagens"
  });
};

export const sendMensagem = (req, res) => {
  return res.status(200).json({
    message: "Mensagem enviada"
  });
};

