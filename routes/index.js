var express = require('express');
var router = express.Router();

var db = require('../queries'); //Postgres
var mssql = require('../queries-mssql'); //MSSQL

//Postgress BD API
router.get('/api/users', db.getAllUsers);
router.get('/api/users/:id', db.getSingleUser);
router.post('/api/users', db.createUser);
router.put('/api/users/:id', db.updateUser);
router.delete('/api/users/:id', db.removeUser);

//MSSQL BD API
router.get('/api/agents', mssql.getAllAgents);

/* GET home page. */
router.get('/', function(req, res, next) {
  
    res.render('index', { title: 'Express'});
  
});

module.exports = router;
