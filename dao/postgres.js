const  pgp  = require('pg-promise')({noWarnings: true}); 
const conf = require('../utils/config');

var pool = {
    user: conf.postgres.user,
    host: conf.postgres.host,
    database: conf.postgres.database,
    password: conf.postgres.password,
    port: conf.postgres.port,
  };

function getDB() {
  console.log(pool);
    return pgp(pool);
}

module.exports = {getDB};