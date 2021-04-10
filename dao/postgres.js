const  pgp  = require('pg-promise')({noWarnings: true}); 
const conf = require('../utils/config');

let ssl = null;
if (conf.postgres.ssl) {
   ssl = {rejectUnauthorized: false};
}

var pool = {
    user: conf.postgres.user,
    host: conf.postgres.host,
    database: conf.postgres.database,
    password: conf.postgres.password,
    port: conf.postgres.port,
    ssl: ssl
  };

function getDB() {
  try{
    console.log(pool);
    return pgp(pool);
  }catch(err){
    console.log(err);
  }
}

module.exports = {getDB};