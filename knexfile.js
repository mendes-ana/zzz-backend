// Configurações do Knex para conexão com o banco de dados PostgreSQL
module.exports = {
  // Cliente do banco de dados
  client: 'postgresql',

  // Configurações da conexão com o banco de dados
  connection: {
    // Nome do banco de dados a ser utilizado
    database: 'cidadedorme',
    // Nome de usuário para autenticação no banco de dados
    user: 'postgres',
    // Senha do usuário para autenticação no banco de dados
    password: 'ana26'
  },

  // Configurações do pool de conexões
  pool: {
    // Número mínimo de conexões a serem mantidas no pool
    min: 2,
    // Número máximo de conexões permitidas no pool
    max: 10
  },

  // Configurações das migrações de banco de dados
  migrations: {
    // Nome da tabela utilizada para registrar as migrações
    tableName: 'knex_migrations'
  }
};
