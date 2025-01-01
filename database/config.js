// database/config.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'palace_of_goods',
    password: 'your_password',
    port: 5432,
});

module.exports = pool;
