var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:postgres@localhost:5433/postgres';
var db = pgp(connectionString);

function getAllUsers(req, res, next) {
    db.any('SELECT * from Users')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL Users'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

function getSingleUser(req, res, next) {
    var userID = parseInt(req.params.id);
    db.one('SELECT * from Users where id = $1', userID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE user'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

function createUser(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('INSERT into Users(name, email, gender, photo_url, birthday, member_since)' +
        'values(${name}, ${breed}, ${age}, ${sex})',
      req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one user'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

function updateUser(req, res, next) {
    db.none('UPDATE Users set name=$1, email=$2, gender=$3, photo_url=$4, birthday=$5, member_since=$6 where id=$7',
      [req.body.name, req.body.breed, parseInt(req.body.age),
        req.body.sex, parseInt(req.params.id)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated user'
          });
      })
      .catch(function (err) {
        return next(err);
      });
}

function removeUser(req, res, next) {
    var userID = parseInt(req.params.id);
    db.result('DELETE from Users where id = $1', userID)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} user`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  }

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};