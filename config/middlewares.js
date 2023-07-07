const bodyParser = require('body-parser'); // Importa o módulo 'body-parser'
const cors = require('cors'); // Importa o módulo 'cors' que habilita requisições de origens diferentes

module.exports = app => {
    app.use(bodyParser.json()); // Adiciona o middleware para analisar o corpo das requisições como JSON

    app.use(cors({ origin: '*' })); // Adiciona o middleware para permitir solicitações de qualquer origem
};
