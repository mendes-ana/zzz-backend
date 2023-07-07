exports.up = function(knex) {
    // Função para aplicar as alterações no banco de dados (ex. criar tabela)
    return knex.schema.createTable('users', table => {
      table.increments('id').primary(); // Coluna 'id' como chave primária
      table.string('name').notNull(); // Coluna 'name' como string não nula
      table.string('email').notNull().unique(); // Coluna 'email' como string não nula e única
      table.string('password').notNull(); // Coluna 'password' como string não nula
    });
  };
  
  exports.down = function(knex) {
    // Função para reverter as alterações no banco de dados (ex. excluir tabela)
    return knex.schema.dropTable('users'); // Excluir a tabela 'users'
  };
  