// Importa o módulo 'express' do Node.js
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();
//Importa o módulo 'db' do diretório './config/db', que é usado para configurar a conexão com o banco de dados.
const db = require('./config/db')
//Importa o módulo 'consign', que é uma biblioteca para carregar automaticamente módulos e anexá-los a um objeto (no caso, o objeto app).
const consign = require('consign')

//Usa o consign para carregar automaticamente os seguintes módulos:
consign()
    .include('./config/passport.js') //configuração relacionada ao autenticação e autorização (passport.js).
    .then('./config/middlewares.js') // contém definições de middlewares personalizados.
    .then('./api') //contém os arquivos que definem as rotas e controladores da API.
    .then('./config/routes.js') //contém a definição das rotas principais da aplicação.
    .into(app) //Anexa os módulos carregados ao objeto app usando o método into(app).
app.db = db //Adiciona o objeto db (provavelmente relacionado ao banco de dados) ao objeto app como uma propriedade chamada db.
// Isso pode ser útil para acessar o banco de dados a partir de outros módulos da aplicação.


// Inicia o servidor e faz com que ele escute na porta 3000
app.listen(3000, () => {
  // Exibe uma mensagem no console quando o servidor é iniciado
  console.log('Backend executando...');
});






