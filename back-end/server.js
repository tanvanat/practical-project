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

// Define route to get person data by ID
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

// Define route to create a new person
app.post('/api/person', async (req, res) => {
  const newPerson = new Tier(req.body);

  try {
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create person' });
  }
});

// POST route to add "many" new persons
app.post('/api/persons', async (req, res) => {
  const newPersons = req.body; // This should be an array of person objects
  try {
    const savedPersons = await Person.insertMany(newPersons); // Use insertMany to save multiple documents
    res.status(201).json(savedPersons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
