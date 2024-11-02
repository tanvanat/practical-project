const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const argon2 = require("argon2");
const session = require('express-session');

// Express application setup
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'your-secret-key', // replace with your actual secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to `true` if using HTTPS
}));

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

// Define User and Patient schemas
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
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

const User = mongoose.model("User", UserSchema);
const Tier = mongoose.model('Tier', Patients_data);

// Route to get the user role
app.get('/api/user-role', async (req, res) => {
    const username = req.session.user?.username; // Use session for username

    if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const user = await User.findOne({ username });
        if (user) {
            res.status(200).json({ role: user.role });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user role' });
    }
});

// Signup route
app.post('/api/users/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Set session for the new user
        req.session.user = { username }; // Add this line to set the session

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Signin route
app.post('/api/users/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await argon2.verify(user.password, password)) {
        req.session.user = { username }; // Set session data
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

// Patients routes

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

// Example of a protected route
app.get('/api/sessions', async (req, res) => {
    try {
        const sessions = await Tier.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
});

// Example protected route for doctors
app.post('/api/doctors', async (req, res) => {
    // Logic to create or edit doctor data
    res.send('Doctor data edited');
});

// Example protected route for admins
app.get('/api/users', async (req, res) => {
    // Logic to fetch users
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
