// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { addOrUpdateEntry, getAllData, getCount } = require('./controllers/entryController');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/api/add-edit', addOrUpdateEntry);
app.get('/api/data', getAllData);
app.get('/api/count', getCount);

// Home route handler
app.get('/', (req, res) => {
  res.send('Your server is live now');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
