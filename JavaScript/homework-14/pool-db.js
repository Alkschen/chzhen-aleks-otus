const Pool = require('pg').Pool
const config = {
    host: 'localhost',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'aleksandr',
    password: 'app12345',
    database: 'otusapp',
    port: 5432,
};
const pool = new Pool(config);


module.exports = pool;