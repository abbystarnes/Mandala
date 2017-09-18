exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_fills', function(table){
    table.increments();
    table.integer('user_id').references("id").inTable("users").onDelete("cascade").notNull();
    table.integer('fill_id').references("id").inTable("fills").onDelete("cascade").notNull();
  }).raw('ALTER SEQUENCE templates_id_seq RESTART WITH 1')
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users_fills');
};
