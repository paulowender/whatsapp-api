import db from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  // Buscando todos os usuários
  db.query(q, (err, data) => {

    // Se der erro, retorna o erro
    if (err) return res.json(err);

    // Retorna os usuários
    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`nome`, `email`, `telefone`, `data_nascimento`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nascimento,
  ];

  // Criando usuário no banco de dados
  db.query(q, [values], (error, result) => {

    // Se der erro, retorna o erro
    if (error) return res.json(error);

    // Adiciona o id do usuario ao objeto
    const id = result.insertId;

    // Retorna a mensagem de sucesso e o usuário criado
    return res.status(200).json({
      message: "Usuário cadastrado com sucesso!",
      id: id,
    });
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `telefone` = ?, `data_nascimento` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nascimento,
  ];

  // Atualiza o usuário no banco de dados
  db.query(q, [...values, req.params.id], (error) => {

    // Se der erro, retorna o erro
    if (error) return res.json(error);

    // Retorna a mensagem de sucesso
    return res.status(200).json({
      message: "Usuário atualizado com sucesso!",
    });
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  // Deleta o usuário no banco de dados
  db.query(q, [req.params.id], (error) => {

    // Se der erro, retorna o erro
    if (error) return res.json(error);

    // Retorna a mensagem de sucesso
    return res.status(200).json("Usuário deletado com sucesso.");
  });
};
