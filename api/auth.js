const { authSecret } = require('../.env'); // Importa a variável 'authSecret' do arquivo .env
const jwt = require('jwt-simple'); // Importa o módulo 'jwt-simple' para lidar com tokens JWT (JSON Web Tokens)
const bcrypt = require('bcrypt-nodejs'); // Importa o módulo 'bcrypt-nodejs' para realizar a comparação de senhas

module.exports = app => {
  const signin = async (req, res) => {
    // Função assíncrona para realizar o login do usuário
    if (!req.body.email || !req.body.senha) {
      return res.status(400).send('Dados incompletos'); // Verifica se o email e senha foram fornecidos corretamente
    }

    const user = await app.db('usuarios')
      .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
      .first(); // Busca o usuário no banco de dados com base no email fornecido

    if (user) {
      bcrypt.compare(req.body.senha, user.senha, (err, isMatch) => {
        // Compara a senha fornecida com a senha armazenada no banco de dados
        if (err || !isMatch) {
          return res.status(401).send('A senha informada é inválida!'); // Retorna uma resposta de erro caso a senha seja inválida
        }

        const payload = {
          id: user.id,
          nome: user.nome,
          email: user.email
        }; // Define o payload do token com informações do usuário

        res.json({
          nome: user.nome,
          email: user.email,
          token: jwt.encode(payload, authSecret), // Gera um token JWT com o payload e o segredo de autenticação
        }); // Retorna uma resposta com as informações do usuário e o token gerado
      });
    } else {
      res.status(400).send('Usuário não cadastrado!'); // Retorna uma resposta de erro caso o usuário não seja encontrado
    }
  };

  return { signin }; // Retorna um objeto com a função 'signin' para ser utilizado externamente
};
