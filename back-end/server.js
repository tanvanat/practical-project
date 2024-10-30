const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB (adjust the URI as needed)
mongoose.connect("mongodb://localhost:27017/newsession", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const sessionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  streetAddress: String,
  phone: String,
  congenital: String,
  allergy: String,
  weight: String,
  height: String,
  about: String,
});

const Session = mongoose.model("Session", sessionSchema);

// Route to handle form submission
app.post("/api/sessions", async (req, res) => {
  const sessionData = req.body; // Get the form data from the request body
  const newSession = new Session(sessionData);

  try {
    await newSession.save(); // Save the data to the database
    res.status(201).json({ message: "Session saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving session data", error });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
