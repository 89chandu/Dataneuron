// backend/server.js
// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://chandubopche321:DetU9mIm3V2JCwbG@cluster0.aphjlls.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for your data (e.g., assuming your data has 'name' and 'value' properties)
const entrySchema = new mongoose.Schema({
  name: String,
  value: String
});

const Entry = mongoose.model('Entry', entrySchema);

// Counter for API calls
let addCount = 0;
let updateCount = 0;

// API to add/edit data
app.post('/api/add-edit', async (req, res) => {
  const { name, value } = req.body;

  // Check if the entry already exists
  const existingEntry = await Entry.findOne({ name });

  if (existingEntry) {
    // Update the existing entry
    existingEntry.value = value;
    existingEntry.save();
    updateCount++;
    res.json({ success: true, message: 'Entry updated successfully' });
  } else {
    // Create a new entry
    const newEntry = new Entry({ name, value });
    newEntry.save();
    addCount++;
    res.json({ success: true, message: 'New entry added successfully' });
  }
});

// API to get all data
app.get('/api/data', async (req, res) => {
  try {
    const allData = await Entry.find();
    res.json(allData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to get the count
app.get('/api/count', (req, res) => {
  res.json({ addCount, updateCount });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
