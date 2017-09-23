exports.up = function(knex, Promise) {
  return knex.schema.createTable('templates', function(table){
    table.increments('id');
    table.string('file_path');
  }).raw('ALTER SEQUENCE templates_id_seq RESTART WITH 1');
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('templates');
};
