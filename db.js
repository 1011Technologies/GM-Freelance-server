const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "anoosh11",
    host: "localhost",
    port: 5432,
    database: "gmfree"
});

// const pool = new Pool({
//     user: "jwbyataieyzzde",
//     password: "8e206c5dd35c8ccc89999ddb5c79cfbf278b528107726679e3430db9e74e6a26",
//     host: "ec2-3-234-204-26.compute-1.amazonaws.com",
//     port: 5432,
//     database: "dbalnvevh40ggr"
// });


module.exports = pool;
