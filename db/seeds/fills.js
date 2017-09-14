
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('fills').del()
    .then(function () {
      // Inserts seed entries
      return knex('fills').insert([
        {template_id: 13, color_array: 'rgb(102, 245, 240),rgb(142, 245, 102),rgb(142, 245, 102),#fff,rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),#fff,rgb(245, 187, 102),rgb(142, 245, 102),#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff'}
      ]);
    });
};
