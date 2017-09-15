process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../db/routes/routes.js');
const knex = require('../');



// get users
    // return array of users objects
describe('GET /users', () => {
    it('responds with JSON', done => {
      request(app)
          .get('/users')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });
});

// get user/:id
  // return user object

// post user/:id
  // return new user object

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
