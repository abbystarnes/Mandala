
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('templates').del()
    .then(function () {
      // Inserts seed entries
      return knex('templates').insert([
        {file_path: 'img/templates/1.svg'},
        {file_path: 'img/templates/2.svg'},
        {file_path: 'img/templates/3.svg'},
        {file_path: 'img/templates/4.svg'},
        {file_path: 'img/templates/5.svg'},
        {file_path: 'img/templates/6.svg'}
      ]);
    });
};
