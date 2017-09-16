'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db')

// get users
    // return array of users objects

router.get('/users', (req, res, next) => {
  knex('users')
    .then(function(data){
      res.json(data)
    })
    .catch(err => next(err))
})

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

module.exports = router
