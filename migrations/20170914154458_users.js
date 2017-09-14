exports.up = function(knex, Promise) {
 return knex.schema.createTable('users', function(table){
   table.increments();
   table.string('user_name');
   table.string('email');
   table.string('hashed_pwd');
 })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('users');
};
