require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// create a new pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Update this with your PostgreSQL connection string
  ssl: {
    rejectUnauthorized: false // This is required if you're using a self-signed certificate
  }
});

// connect to db
pool.connect()
  .then(() => {
    console.log('Connected to the database');

    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
