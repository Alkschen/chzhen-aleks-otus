require('dotenv').config();

const Pool = require('pg').Pool
const config = {
    host: 'localhost',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
};
const pool = new Pool(config);

module.exports = pool;