module.exports = {
    postgres:{
        user: process.env.USER_PG || 'postgres',
        host: process.env.HOST_PG || 'localhost',
        database: process.env.DB_PG || 'transferencias',
        password: process.env.PASS_PG || 'admin',
        port: process.env.PORT_PG || 5432,
        ssl: process.env.SSL_PG || false
    },
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000
  }