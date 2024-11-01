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
  firstName: String,
  lastName: String,
  id: String, //firstname
  href: String,
  email: String,
  country: String,
  streetAddress: String,
  congenital: String,
  allergy: String,
  weight: String,
  height: String,
  imageUrl: String,
  description: String,
  features: [String],
  emergencyContact: [String],
  featured: Boolean,
  presentingConcern: String,
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

// Define a new schema for the uploaded images
const imageSchema = new mongoose.Schema({
  imageUrl: String, // URL or data of the uploaded image
  createdAt: { type: Date, default: Date.now }, // Optional: Store the upload time
});

// Create a model for the uploaded images
const ImageUpload = mongoose.model('ImageUpload', imageSchema);

// Create a new API endpoint to handle image uploads
app.post('/api/camera/upload', async (req, res) => {
  const { image } = req.body; // Extract the image data from the request body

  if (!image) {
    return res.status(400).json({ error: 'No image data provided' });
  }

  try {
    // Create a new instance of the ImageUpload model
    const newImage = new ImageUpload({ imageUrl: image });
    await newImage.save(); // Save the image data to the database

    // Respond with the saved image data (including its ID)
    res.status(201).json({ success: true, imageId: newImage._id });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Failed to save image' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
