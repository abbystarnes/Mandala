'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db')
const cors = require('cors');
// get users
    // return array of users objects
    //


router.get('/users', (req, res, next) => {
  knex('users')
    .then(function(data){
      // console.log(data);
      res.json(data)
    })
    .catch(err => next(err))
})

// get user/:id
  // return user object

router.get('/users/:id', (req, res, next) => {
  knex('users')
    .where({id: req.params.id})
    .then(function(data){
      // console.log(data);
      res.json(data)
    })
    .catch(err => next(err))
})

// post user/:id
  // return new user object
router.post('/users', (req, res, next) => {
  knex('users')
    .insert({id: req.body.id, user_name: req.body.user_name, email: req.body.email, hashed_pwd: req.body.hashed_pwd})
    .returning('*')
    .then(function(data){
      // console.log(data);
      res.json(data)
    })
    .catch(err => next(err))
})

// get templates
  // return all templates
router.get('/templates', (req, res, next) => {
  knex('templates')
    .then(function(data){
      // console.log(data);
      res.json(data)
    })
    .catch(err => next(err))
})

// get fills/:id
    // get fills where user_id is user_id (join fills fills_users)
    // return array of fills objects
router.get('/fills/:id', (req, res, next) => {
  knex('fills')
    .join('users_fills', 'fills.id', 'users_fills.fill_id')
    .join('users', 'users.id', 'users_fills.user_id')
    .where({user_id: req.params.id})
    .then(function(data){
      // console.log(data);
      res.json(data)
    })
    .catch(err => next(err))
})

// patch fills/:id
   // update fills array where fill_id is current fill_id
   // return updated fills object

   // app.options('/products/:id', cors()) // enable pre-flight request for DELETE request
   // app.del('/products/:id', cors(), function (req, res, next) {
   //   res.json({msg: 'This is CORS-enabled for all origins!'})
   // })

router.options('/fills/:id', cors());
 router.patch('/fills/:id', cors(), (req, res, next) => {
     knex('fills')
      .update('color_array', req.body.color_array)
      .where('id', req.params.id)
     .then(function(data){
       res.json(data)
     })
     .catch(err => next(err))
 });


// post fills/:id
    // insert new item into fills
    // insert new item into users_fills
    // return new fill object, new users_fills object
router.post('/fills/:id', (req, res, next) => {
    knex('fills')
    .insert({color_array: req.body.color_array, template_id: req.body.template_id})
    .returning('id')
    .then(function(response){
      knex('users_fills')
      .insert({user_id: req.params.id[0], fill_id: response[0]})
      .returning('*')
      .then(function(data){
        let ret_val = [response[0], data[0]];
        res.json(ret_val);
      })
    })
    .catch(err => next(err))

})

// delete fills/:id
router.delete('/fills/:id', (req, res, next) => {
    knex('fills')
    .where('id', req.params.id)
    .del()
    .then(function(data){
        res.json(data);
    })
    .catch(err => next(err))
})
  // remove item from fills
  // item should autoremove from users_fills?
  // return removed object, removed users_fills object

module.exports = router
