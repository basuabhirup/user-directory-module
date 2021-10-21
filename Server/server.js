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

// Handle 'GET' and 'POST' requests made on the '/api/users' route:
app.route('/api/users')
  .get((req, res) => {
    User.find({}, (err, users) => {
      if(!err) {
        res.status(200).json(users);
      } else {
        res.status(400).json({"error": err});
      }
    })
  })
  .post((req, res) => {
  const user = new User(req.body);
  user.save(err => {
    if(!err) {
      res.redirect('/api/users');
    } else {
      res.status(400).json({"error": err});
    }
  })
})

// Handle 'GET', 'PATCH' and 'DELETE' requests made on the '/api/user/:id' route to edit or delete a particular user's details:
app.route('/api/user/:id')
  .get((req, res) =>{
    const id = req.params.id;
    User.findById(id, (err, user) => {
      if(!err) {
        res.status(200).json(user);
      } else {
        res.status(400).json({"error": err});
      }
    })
  })
  .patch((req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const mobile = req.body.mobile;
    const email = req.body.email;
    User.findByIdAndUpdate(id, {_id: id, name, mobile, email}, err => {
      if(!err) {
        res.status(200).json(`Updated user with id: ${id} !`);
      } else {
        res.status(400).json({"error": err});
      }
    })
  })
  .delete((req, res) => {
    const id = req.params.id;
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