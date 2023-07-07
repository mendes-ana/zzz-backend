const { authSecret } = require('../.env'); // Importa a variável 'authSecret' do arquivo .env
const passport = require('passport'); // Importa o módulo 'passport' para autenticação
const passportJwt = require('passport-jwt'); // Importa o módulo 'passport-jwt' para estratégia JWT
const { Strategy, ExtractJwt } = passportJwt; // Desestruturação do módulo passportJwt para obter a classe Strategy e o método ExtractJwt

module.exports = app => {
  const params = {
    secretOrKey: authSecret, // Define a chave secreta para verificar a assinatura do token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do cabeçalho de autorização do tipo Bearer
  };
  
  const strategy = new Strategy(params, (payload, done) => {
    // Cria uma nova estratégia JWT para autenticação
    app.db('users')
      .where({ id: payload.id }) // Busca o usuário no banco de dados com base no ID do payload do token
      .first()
      .then(user => {
        if (user) {
          done(null, { id: user.id, email: user.email }); // Autenticação bem-sucedida, passa as informações do usuário para o callback
        } else {
          done(null, false); // Usuário não encontrado, autenticação falha
        }
      })
      .catch(err => done(err, false)); // Erro ao buscar o usuário, autenticação falha
  });

  passport.use(strategy); // Usa a estratégia JWT no passport

  return {
    initialize: () => passport.initialize(), // Inicializa o passport para ser usado nas rotas
    authenticate: () => passport.authenticate('jwt', { session: false }), // Middleware de autenticação JWT
  };
};
