const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "anoosh11",
    host: "localhost",
    port: 5432,
    database: "gmfree"
});

module.exports = pool;
