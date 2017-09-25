exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('fills').del()
    .then(function () {
      // Inserts seed entries
      return knex('fills').insert([

      ]);
    });
};
