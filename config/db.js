// Importa as configurações do arquivo knexfile.js
const config = require('../knexfile.js');

// Importa o Knex e cria uma instância com base nas configurações
const knex = require('knex')(config);

// Executa as migrações mais recentes do banco de dados
knex.migrate.latest([config]);

// Exporta a instância do Knex
module.exports = knex;