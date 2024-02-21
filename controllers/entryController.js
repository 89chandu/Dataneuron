// backend/controllers/entryController.js
const Entry = require('../models/entryModel');

// Counter for tracking the number of added and updated entries
let addCount = 0;
let updateCount = 0;

// Add or update an entry in the database
async function addOrUpdateEntry(req, res) {
  const { name, value } = req.body;

  try {
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
  } catch (error) {
    console.error('Error adding/updating entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Retrieve all data from the database
async function getAllData(req, res) {
  try {
    const allData = await Entry.find();
    res.json(allData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Retrieve the count of added and updated entries
function getCount(req, res) {
  res.json({ addCount, updateCount });
}

// Export the functions for use in other modules
module.exports = { addOrUpdateEntry, getAllData, getCount };
