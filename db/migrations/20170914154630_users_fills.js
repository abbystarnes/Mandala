exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_fills', function(table){
    table.increments('id');
    table.integer('user_id');
    table.integer('fill_id');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users_fills');
};
