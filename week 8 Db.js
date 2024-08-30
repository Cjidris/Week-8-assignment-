Require('dotenv').config(); 

// Load environment variables from .env file

const mongoose = require('mongoose');

// Retrieve MongoDB URI from environment variables
const dbURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(dbURI, 
  { useNewUrlParser: true, 
useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose;

