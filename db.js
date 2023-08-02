const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "anoosh11",
//     host: "localhost",
//     port: 5432,
//     database: "gmfree"
// });

const pool = new Pool({
    user: "tidxyogfeumywd",
    password: "f639f9827d7058221ce8d3afad0d12f1000d4d2cdf15b12cd17563b865c3fb6d",
    host: "ec2-54-156-233-91.compute-1.amazonaws.com",
    port: 5432,
    database: "d6g3oftc75qmhi"
});


module.exports = pool;
