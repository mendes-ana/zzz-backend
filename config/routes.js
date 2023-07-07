module.exports = app => {
    // Rota para cadastrar um novo usuário
    app.post('/signup', app.api.user.save);
    
    // Rota para autenticar um usuário
    app.post('/signin', app.api.auth.signin);
  
  }
  