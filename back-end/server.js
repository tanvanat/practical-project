const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Patients', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Sample data (simulating a database)
const tierSchema = new mongoose.Schema({
  name: String,
  id: String,
  href: String,
  imageUrl: String,
  description: String,
  features: [String],
  emergencyContact: [String],
  featured: Boolean,
});

// Create a model
const Tier = mongoose.model('Tier', tierSchema);

//Get person's data: Sessions.js/Today.js
app.get('/api/person/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const person = await Tier.findOne({ id: personId });

    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Create a new person: Newsession.js
app.post('/api/person', async (req, res) => {
  const newPerson = new Tier(req.body);

  try {
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create person' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
