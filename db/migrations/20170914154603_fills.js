exports.up = function(knex, Promise) {
  return knex.schema.createTable('fills', function(table){
    table.increments();
    table.text('color_array');
    table.integer('template_id').references("id").inTable("templates").onDelete("cascade").notNull();
  }).raw('ALTER SEQUENCE templates_id_seq RESTART WITH 1')
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fills');
};
