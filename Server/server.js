// Require necessary NPM modules:
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


// Configure App:
const app = express();
const port = process.env.PORT || 5000;

// Set Middlewares:
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../Client', 'build')));



// Connect to a new MongoDB Database, using Mongoose ODM:
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m5s9h.mongodb.net/userDirectoryDB?retryWrites=true&w=majority`);

mongoose.connection.once('open', () => {
  console.log(`Connected to Mongo Atlas Database`);
})

// Create a new collection to store the users' details:
const userSchema = new mongoose.Schema ({
	name: { 
    type: String, 
    required: true 
  },
  mobile: Number,
  email: String
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema);


// Set API endpoints:

// Handle 'GET' requests made on the '/' route to serve the optimised frontend production build:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client', 'build', 'index.html'));
});



// Set listener:
app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
})