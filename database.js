// backend/database.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const entrySchema = new mongoose.Schema({
  name: String,
  value: String
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = { Entry };
