exports.up = function(knex, Promise) {
 return knex.schema.createTable('users', function(table){
   table.increments('id');
   table.string('user_name');
   table.string('email');
   table.string('hashed_pwd');
 }).raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('users');
};
