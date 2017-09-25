exports.up = function(knex, Promise) {
  return knex.schema.createTable('fills', function(table){
    table.increments('id');
    table.text('color_array');
    table.integer('template_id');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fills');
};
