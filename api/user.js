const bcrypt = require('bcrypt-nodejs'); // Importa o módulo 'bcrypt-nodejs' para realizar a criptografia de senha

module.exports = app => {
  const obterHash = (senha, callback) => {
    // Função para obter o hash da senha usando o 'bcrypt'
    bcrypt.genSalt(10, (err, salt) => {
      // Gera um salt aleatório para a criptografia da senha
      bcrypt.hash(senha, salt, null, (err, hash) => callback(hash));
      // Gera o hash da senha usando o salt gerado anteriormente e chama o callback com o hash gerado
    });
  };

  const save = (req, res) => {
    // Função para salvar um usuário no banco de dados
    obterHash(req.body.senha, hash => {
      // Obtém o hash da senha fornecida
      const senha = hash; // Armazena o hash da senha obtido em uma variável chamada 'password'

      app.db('usuarios')
        .insert({ 
          nome: req.body.nome, // Insere o nome do usuário
          email: req.body.email.toLowerCase(), // Insere o email do usuário em letras minúsculas
          senha // Insere o hash da senha
        })
        .then(_ => res.status(204).send()) // Envio de resposta de sucesso sem conteúdo (status 204)
        .catch(err => res.status(400).json(err)); // Envio de resposta de erro (status 400) com o erro em formato JSON
    });
  };

  return { save }; // Retorna um objeto com a função 'save' para ser utilizado externamente
};
