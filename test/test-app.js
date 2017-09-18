process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../db/index.js');
const knex = require('../db/db_test');

beforeEach(done => {
  Promise.all([
    knex('users').insert({id: 1, email: 'test1@gmail.com', hashed_pwd: 'alewjfkasdfje', user_name: 'test1'}),
    knex('users').insert({id: 2, email: 'test2@gmail.com', hashed_pwd: '34rhadslkjflwj', user_name: 'test2'}),
    knex('users').insert({id: 3, email: 'test3@gmail.com', hashed_pwd: 'lxjlijlkejaslkj', user_name: 'test3'}),
    knex('templates').insert({id: 1, file_path: 'img/templates/1.svg'}),
    knex('templates').insert({id: 2, file_path: 'img/templates/2.svg'}),
    knex('templates').insert({id: 3, file_path: 'img/templates/3.svg'}),
  ]).then(() => done());
});

beforeEach(done => {
  Promise.all([
    knex('fills').insert({id: 1, template_id: 2, color_array: 'rgb(102, 245, 240),rgb(142, 245, 102),rgb(142, 245, 102),#fff,rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),#fff,rgb(245, 187, 102),rgb(142, 245, 102),#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff'})
  ]).then(() => done());
});
beforeEach(done => {
  Promise.all([
    knex('users_fills').insert({id: 1, user_id: 1, fill_id: 1})
  ]).then(() => done());
});

afterEach(done => {
  Promise.all([
      knex('users_fills').del(),
      knex('fills').del(),
      knex('templates').del(),
      knex('users').del()
  ]).then(() => done());
});


// get users
// return array of users objects
describe('GET /users', () => {
    it('responds with JSON', done => {
      request(app)
          .get('/users')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

    it('returns an array of all user objects', done => {
      request(app)
      .get('/users')
      .end((err, res) => {
        expect(res.body).to.deep.equal([
        {
          id: 1,
          user_name: 'test1',
          email: 'test1@gmail.com',
          hashed_pwd: 'alewjfkasdfje' },
        {
          id: 2,
          user_name: 'test2',
          email: 'test2@gmail.com',
          hashed_pwd: '34rhadslkjflwj' },
        {
          id: 3,
          user_name: 'test3',
          email: 'test3@gmail.com',
          hashed_pwd: 'lxjlijlkejaslkj' }
        ]);
          done();
      });
    });
});

// get user/:id
  // return user object
describe('GET /users/:id', () => {
    it('responds with JSON', done => {
      request(app)
          .get('/users/1')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

    it('returns user object', done => {
      request(app)
      .get('/users/1')
      .end((err, res) => {
        expect(res.body).to.deep.equal([
        {
          id: 1,
          user_name: 'test1',
          email: 'test1@gmail.com',
          hashed_pwd: 'alewjfkasdfje' },
         ]);
          done();
      });
    });
});

// post user/:id
  // return new user object
describe('POST /users', () => {

    var newUser = {
      id: 4,
      user_name: 'test4',
      email: 'test4@gmail.com',
      hashed_pwd: '4dsajafklsdjalkfe'
    }

    it('responds with JSON', done => {
      request(app)
          .post('/users')
          .type('form')
          .send(newUser)
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

    it('returns new user object', done => {
      request(app)
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body).to.deep.equal([
            {
              id: 4,
              user_name: 'test4',
              email: 'test4@gmail.com',
              hashed_pwd: '4dsajafklsdjalkfe'
            },
           ]);
            done();
        });
    });

    it('adds the new user to the database', done => {
      request(app)
        .post('/users')
        // .type('form')
        .send(newUser)
        .end((err, res) => {
          knex('users').select().then(users => {
            expect(users).to.have.lengthOf(4);
            expect(users).to.deep.include(newUser);
            done();
          });
        });
    });
});


// get templates
describe('GET /templates', () => {
    it('responds with JSON', done => {
      request(app)
          .get('/templates')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

    it('returns an array of all template objects', done => {
      request(app)
      .get('/templates')
      .end((err, res) => {
        expect(res.body).to.deep.equal([
          {id: 1, file_path: 'img/templates/1.svg'},
          {id: 2, file_path: 'img/templates/2.svg'},
          {id: 3, file_path: 'img/templates/3.svg'}
        ]);
          done();
      });
    });
});


  // return all templates

// get fills/:id
    // get fills where user_id is user_id (join fills fills_users)
    // return array of fills objects
describe('GET /fills/1', () => {
    it('responds with JSON', done => {
      request(app)
          .get('/fills/1')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

    it('returns an array of all fill objects associated with user id', done => {
      request(app)
      .get('/fills/1')
      .end((err, res) => {
        expect(res.body).to.deep.equal([
          {id: 1, template_id: 2, color_array: 'rgb(102, 245, 240),rgb(142, 245, 102),rgb(142, 245, 102),#fff,rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),#fff,rgb(245, 187, 102),rgb(142, 245, 102),#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff', user_id: 1, fill_id: 1, email: 'test1@gmail.com', hashed_pwd: 'alewjfkasdfje', user_name: 'test1'}
        ]);
          done();
      });
    });
});

// patch fills/:id
   // update fills array where fill_id is current fill_id
   // return updated fills object
   describe('PATCH /fills/:id', () => {
        let updated_array= {color_array: 'rgb(102, 245, 240),rgb(142, 245, 102),rgb(142, 245, 102),#fff,rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),#fff,rgb(245, 187, 102),rgb(142, 245, 102),#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,rgb(102, 245, 240),rgb(102, 245, 240)'}

       it('responds with JSON', done => {
         request(app)
             .patch('/fills/1')
             .send(updated_array)
             .expect('Content-Type', /json/)
             .expect(200, done);
       });

       it('returns number of rows affected', done => {
         request(app)
           .patch('/fills/1')
           .send(updated_array)
           .end((err, res) => {
             expect(res.body).to.deep.equal(1);
               done();
           });
       });

       it('updates the color array in the database', done => {
         request(app)
           .patch('/fills/1')
           .send(updated_array)
           .end((err, res) => {
             knex('fills').select().where('id', 1).then(data => {
               expect(data[0]).to.deep.include(updated_array);
               done();
             });
           });
       });
   });


// post fills/:id
    // insert new item into fills
    // insert new item into users_fills
    // return new fill object, new users_fills object
    describe('POST /fills', () => {

        var newFill = {
          color_array: 'rgb(102, 245, 240),rgb(142, 245, 102),rgb(142, 245, 102),#fff,rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),#fff,rgb(245, 187, 102),rgb(142, 245, 102),#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,rgb(102, 245, 240),rgb(102, 245, 240)',
          template_id: 3
        }

        it('responds with JSON', done => {
          request(app)
              .post('/fills')
              .send(newFill)
              .expect('Content-Type', /json/)
              .expect(200, done);
        });

        it('returns new fill object', done => {
          request(app)
            .post('/fills')
            .send(newFill)
            .end((err, res) => {
              expect(res.body[0]).to.deep.equal(2);
                done();
            });
        });

        // it('adds the new user to the database', done => {
        //   request(app)
        //     .post('/users')
        //     // .type('form')
        //     .send(newUser)
        //     .end((err, res) => {
        //       knex('users').select().then(users => {
        //         expect(users).to.have.lengthOf(4);
        //         expect(users).to.deep.include(newUser);
        //         done();
        //       });
        //     });
        // });
    });


// delete fills/:id
  // remove item from fills
  // item should autoremove from users_fills?
  // return removed object, removed users_fills object
