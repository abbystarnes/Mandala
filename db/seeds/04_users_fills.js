
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_fills').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_fills').insert([
        {id: 1, user_id: 1, fill_id: 1},
      ]);
    });
};
