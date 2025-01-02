// database/config.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost:5432',
    database: 'palace_of_goods',
    password: 'Sup3rUs3r',
    port: 5432,
});

module.exports = pool;
