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
  mobile: String,
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

// Handle 'GET' requests made on the '/api/users' route to get all users' details:
app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if(!err) {
      res.status(200).json(users);
    } else {
      res.status(400).json({"error": err});
    }
  })
})

// Handle 'POST' requests made on the '/api/user/add' route to add a user:
app.post('/api/user/add', (req, res) => {
  const user = new User(req.body);
  user.save(err => {
    if(!err) {
      res.redirect('/api/users');
    } else {
      res.status(400).json({"error": err});
    }
  })
})

// Handle 'PATCH' requests made on the '/api/user/update' route to edit a particular user's details:
app.patch('/api/user/update', (req, res) => {
  const id = req.body.objId;
  User.findByIdAndUpdate(id, req.body, err => {
    if(!err) {
      res.status(200).json(`Updated user with id: ${id} !`);
    } else {
      res.status(400).json({"error": err});
    }
  })
})

// Handle 'DELETE' requests made on the '/api/user/delete' route to delete a particular user:
app.delete('/api/user/delete', (req, res) => {
  const id = req.body.objId;
  User.findByIdAndRemove(id, err => {
    if(!err) {
      res.status(200).json(`Deleted user with id: ${id} !`);
    } else {
      res.status(400).json({"error": err});
    }
  })
})


// Set listener:
app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
})