
'use strict'
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const path = require('path');
// const knex = require('../db/knex');
// const bcrypt = require('bcrypt-as-promised');
// var GoogleAuth = require('google-auth-library');
// const saltRounds = 10;
const methodOverride = require('method-override');
router.use(methodOverride('X-HTTP-Method-Override'))

router.get('/', async(req, res, next) => {
    // res.send('hello')
      res.render('pages/index', {});
});

module.exports = router;
