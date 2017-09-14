exports.up = function(knex, Promise) {
  return knex.schema.createTable('fills', function(table){
    table.increments();
    table.string('color_array');
    table.integer('template_id').references("id").inTable("templates").onDelete("cascade").notNull();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fills');
};
