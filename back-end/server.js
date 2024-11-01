const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const argon2 = require("../Argon2/node_modules/argon2"); // Adjust this path
const jwt = require('jsonwebtoken');
const NodeRSA = require('node-rsa');

// Generate RSA key pair for JWT signing
const key = new NodeRSA({ b: 2048 });
const privateKey = key.exportKey('private');
const publicKey = key.exportKey('public');

const app = express();
const PORT = 5000;

// Use RSA keys for JWT
const JWT_PRIVATE_KEY = privateKey;
const JWT_PUBLIC_KEY = publicKey;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema for patient data
const Patients_data = new mongoose.Schema({
  firstName: String,
  lastName: String,
  id: String,
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
  emergencyContact: String,
  featured: Boolean,
  presentingConcern: String,
});

Patients_data.pre('save', function (next) {
  if (!this.id) this.id = this.firstName;
  next();
});

const Tier = mongoose.model('Tier', Patients_data);

// User schema with password hashing
const User_data = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor'], default: 'doctor' },
  rsaPublicKey: { type: String, required: true },
  rsaPrivateKey: { type: String, required: true },
});

User_data.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await argon2.hash(this.password);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

User_data.methods.verifyPassword = async function (inputPassword) {
  return await argon2.verify(this.password, inputPassword);
};

const User = mongoose.model("User", User_data);

// Middleware for role-based authorization
function authorize(roles = []) {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!roles.length || roles.includes(userRole)) return next();
    res.status(403).json({ error: 'Forbidden' });
  };
}

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Signup route
app.post('/api/users/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const key = new NodeRSA({ b: 2048 });
    const rsaPrivateKey = key.exportKey('private');
    const rsaPublicKey = key.exportKey('public');

    const newUser = new User({
      username,
      password,
      role,
      rsaPrivateKey,
      rsaPublicKey,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: { username, role, rsaPublicKey } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Signin route with RSA JWT token
app.post('/api/doctors/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid username or password.' });

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid username or password.' });

    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protect the /api/users route
app.get('/api/users', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['doctor', 'admin'] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


// Patients routes
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




// Update an existing person
app.put('/api/person/:id', authorize('doctor'), async (req, res) => {
  try {
    const personId = req.params.id;
    const person = await Tier.findOne({ id: personId });

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    Object.assign(person, req.body);
    await person.save();
    res.json(person);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update person' });
  }
});

// Create a new session
app.post('/api/newsession/upload', async (req, res) => {
  const sessionData = req.body;
  const patientId = sessionData.patientId;

  try {
    const existingSession = await Tier.findOne({ patientId });

    if (existingSession) {
      Object.assign(existingSession, sessionData);
      await existingSession.save();
      return res.status(200).json(existingSession);
    }

    const newSession = new Tier(sessionData);
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create or update session' });
  }
});

// Get all sessions
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
