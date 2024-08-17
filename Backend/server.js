const express = require('express');
const connectToDb = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;
const db_url = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the home route');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events')); // Ensure this path is correct

app.listen(port, async () => {
    try {
      await connectToDb(db_url);
      console.log('Connected to the Database');
      console.log(`Server is running at the port ${port}`);
    } catch (error) {
      console.error(error);
    }
  });