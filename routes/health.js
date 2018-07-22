'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res){
  if(mongoose.connection.readyState !== 1) {res.sendStatus(500);}
  else{res.send('ok')}
});

module.exports = router;