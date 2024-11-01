const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Patients_data = new mongoose.Schema({
  firstName: String,
  lastName: String,
  id: String, // Automatically set to firstName
  href: String,
  email: String,
  country: String,
  streetAddress: String,
  congenital: String,
  allergy: String,
  weight: String,
  height: String,
  description: String,
  features: [String],
  emergencyContact: String, // Change this to String for a single phone number
  featured: Boolean,
  presentingConcern: String,
});


// Pre-save hook to set `id` to `firstName`
Patients_data.pre('save', function(next) {
  if (!this.id) {
    this.id = this.firstName; // Automatically set `id` to `firstName` if not already defined
  }
  next();
});

const Tier = mongoose.model('Tier', Patients_data);


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

// Create a new session: NewSession.js
app.post('/api/newsession/upload', async (req, res) => {
  const sessionData = req.body; // Extract session data from the request body

  try {
    // Assuming you want to save session data in a separate collection
    const newSession = new Tier(sessionData); // Or you might want to define a new model for sessions

    await newSession.save(); // Save session data to the database
    res.status(201).json(newSession); // Respond with the created session data
  } catch (error) {
    res.status(400).json({ error: 'Failed to create session' }); // Handle errors
  }
});

// Get all sessions: Sessions.js
app.get('/api/sessions', async (req, res) => {
  try {
    const sessions = await Tier.find(); // Fetch all documents from the Tier collection
    res.json(sessions); // Send all sessions data as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' }); // Handle errors
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
