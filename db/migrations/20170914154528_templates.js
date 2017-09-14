exports.up = function(knex, Promise) {
  return knex.schema.createTable('templates', function(table){
    table.increments();
    table.string('file_path');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('templates');
};
