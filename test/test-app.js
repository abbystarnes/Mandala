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
  ]).then(() => done());
});

afterEach(done => { knex('users').del().then(() => done()) });

// get users
// return array of users objects
describe('GET /users', () => {
    xit('responds with JSON', done => {
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
    xit('responds with JSON', done => {
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
        // .type('form')
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

//
// var newUser = {
//   id: 3,
//   user_name: 'test1',
//   email: 'test1@gmail.com',
//   hashs
// }

// get templates

  // return all templates

// get fills/:id
    // get fills where user_id is user_id (join fills fills_users)
    // return array of fills objects

// patch fills/:id
   // update fills array where fill_id is current fill_id
   // return updated fills object

// post fills/:id
    // insert new item into fills
    // insert new item into users_fills
    // return new fill object, new users_fills object

// delete fills/:id
  // remove item from fills
  // item should autoremove from users_fills?
  // return removed object, removed users_fills object
