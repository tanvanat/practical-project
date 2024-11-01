const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const argon2 = require("../Argon2/node_modules/argon2"); // Adjust this path

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

// Patients_data schema
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
  emergencyContact: String, // Single phone number
  featured: Boolean,
  presentingConcern: String,
});

// Pre-save hook to set `id` to `firstName`
Patients_data.pre('save', function (next) {
  if (!this.id) {
    this.id = this.firstName; // Automatically set `id` to `firstName` if not already defined
  }
  next();
});

const Tier = mongoose.model('Tier', Patients_data);

// Doctors_data schema
const Doctors_data = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // Ensure username is unique
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash password before saving
Doctors_data.pre("save", async function (next) {
  const doctor = this;

  // Only hash if the password has been modified (or is new)
  if (doctor.isModified("password")) {
    try {
      // Hash the password
      doctor.password = await argon2.hash(doctor.password);
    } catch (err) {
      return next(err);
    }
  }

  next();
});

// Method to verify password
Doctors_data.methods.verifyPassword = async function (inputPassword) {
  return await argon2.verify(this.password, inputPassword);
};

const Doctor = mongoose.model("Doctor", Doctors_data);

// Get all doctors: This will expose usernames and passwords (consider security implications)
app.get('/api/doctors', async (req, res) => {
  try {
    // Retrieve all doctors from the database
    const doctors = await Doctor.find({}, 'username password'); // Only retrieve username and password fields

    // Send back the list of doctors
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Create a new doctor: Add this route in your existing Express app
app.post('/api/doctors', async (req, res) => {
  const { username, password } = req.body;

  // Ensure both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Create a new doctor instance
  const newDoctor = new Doctor({ username, password });

  try {
    // Save the new doctor to the database
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate username error
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Failed to create doctor' });
  }
});

// Assuming you already have your Doctor model set up
app.post('/api/doctors/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ username });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Verify the password
    const isValidPassword = await doctor.verifyPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Successful authentication
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Patients routes
// Get person's data: Sessions.js/Today.js
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

// Create a new person: Newsession.js
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
  const patientId = sessionData.patientId; // Assuming patientId is part of the session data

  try {
    // Check if a session already exists for the specified patient ID
    const existingSession = await Tier.findOne({ patientId });

    if (existingSession) {
      // If a session exists, update it
      Object.assign(existingSession, sessionData);
      await existingSession.save();
      return res.status(200).json(existingSession);
    }

    // If no existing session, create a new one
    const newSession = new Tier(sessionData);
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create or update session' });
  }
});

// Get all sessions: Sessions.js
app.get('/api/sessions', async (req, res) => {
  try {
    const sessions = await Tier.find();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
