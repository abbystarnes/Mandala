exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_name: 'guest', email: 'guest@gmail.com'},
        {user_name: 'guest2', email: 'guest2@gmail.com'}
      ]);
    });
};
