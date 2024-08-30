// models/gradstudent.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/gradstudent');  

const app = express();
const port = 3000;  

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log('Connected to MongoDB...!'))
.catch(err => console.error('Failed to connect to MongoDB', err));


const newUser = new User({
  name: 'billy joe',
  email: 'buzzinga@example.com',
  age: 20,
});

newUser.save((err, user) => {
  if (err) return console.error(err);
  console.log('User saved:', user);
});


User.findOne({ email: 'buzzinga@example.com' }, (err, user) => {
  if (err) return console.error(err);
  console.log('Found user:', user);
});

// POST /add-user Route 
app.post('/add-user', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Create a new user
    const newUser = new User({ name, email, age });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    // Handle validation errors and other issues
    res.status(400).json({ error: err.message });

  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Define the /add-users route
app.post('/add-users', async (req, res) => {
  const users = req.body;

  // Initialize error collection
  const errors = [];

  // Validate each user object
  for (const [index, user] of users.entries()) {
    const { name, email, age } = user;

    // Validate required fields
    if (!name || !email || age === undefined) {
      errors.push({ index, error: 'Name, email, and age are required for each user.' });
      continue;

    }

    // Validate name length
    if (name.length < 3) {
      errors.push({ index, error: 'Name must be at least 3 characters long.' });
      continue;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({ index, error: 'Email must be a valid email address.' });
      continue;
    }

    // Validate age
    if (age < 18 || age > 99) {
      errors.push({ index, error: `Age ${age} is not between 18 and 99.`});
      continue;
    }
  }

  // If there are errors, return them with a 400 status
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Save valid users to the database
    const savedUsers = await User.insertMany(users);
    res.status(201).json(savedUsers);
  } catch (error) {
    console.error('Error saving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
