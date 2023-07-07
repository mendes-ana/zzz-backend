exports.up = function(knex, Promise) {
    // Função para aplicar as alterações no banco de dados (ex. criar tabela)
    return knex.schema.createTable('savedgames', table => {
      table.increments('id').primary(); // Coluna 'id' como chave primária
      table.integer('n_p').notNull();
      table.integer('n_ass').notNull();
      table.integer('n_xer').notNull();
      table.integer('n_ang').notNull();
      table.integer('userId').references('id').inTable('users').notNull();
      // Coluna 'userId' como inteiro não nulo referenciando a coluna 'id' na tabela 'users'
    });
  };
  
  exports.down = function(knex, Promise) {
    // Função para reverter as alterações no banco de dados (ex. excluir tabela)
    return knex.schema.dropTable('savedgames'); // Excluir a tabela 'tasks'
  };
  