const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "anoosh11",
//     host: "localhost",
//     port: 5432,
//     database: "gmfree"
// });

// const pool = new Pool({
//     user: "opkxhltnrgdbsc",
//     password: "29961fa9637e94e66d9df4229fdf7e54c880ef1e6618e6b02438620d7b0cc80c",
//     host: "ec2-35-169-11-108.compute-1.amazonaws.com",
//     port: 5432,
//     database: "db4ms68ttr34po"
// });
const connectionString = 'postgres://uxddzqgzebuoiu:68a43ee749a188d2f0de601a57e21b2b91a7b5552cd1eec4e929c8ca7da2b034@ec2-34-238-201-192.compute-1.amazonaws.com:5432/d54ppip3o3cu6e';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false  // for Heroku's free tier Postgres plan which uses a self-signed certificate
  }
});

module.exports = pool;
