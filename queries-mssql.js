var ISOLATION_LEVEL = require('tedious').ISOLATION_LEVEL;
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const config = {
  server: '######',
  options: {
      encrypt: true,
      database: '#######',
      enableArithAbort: true, connectionIsolationLevel: ISOLATION_LEVEL.READ_UNCOMMITTED
    },
  authentication: {
    type: 'default',
    options: {
      userName: '######',
      password: '######'
    }
  }
}

const connection = new Connection(config);

function getAllAgents(req, res, next) {
    const connection = new Connection(config);
    connection.on('connect', function(err){
        if (err){
            console.log(err);
        } else {
            console.log('Connected!');
            request = new Request('SELECT * from CatAgente FOR JSON PATH', function (err, rowCount) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(rowCount + ' rows');
                }
                connection.close();
                // return rowCount from API
                res.json({
                    status: 'success',
                    data: rowCount,
                    message: 'Retrieved ALL Agents'
                  });
            });
        
            // row iteratore for result
            request.on('row', function (columns) {
                columns.forEach(function (column) {
                    if (column.value === null) {
                        console.log('NULL');
                    } else {
                        console.log(column.value);
                    }
                });
            });
            
            // execute query
            connection.execSql(request); 
        }
    });
}

module.exports = {
    getAllAgents: getAllAgents
};