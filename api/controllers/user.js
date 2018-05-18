const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "this is a secret";
const createUser = function(req, res) {
   const { username, password } = req.body;

   User.create(req.body)
   .then(user => {
     const token = makeToken(user);
     user.makeToken((username) => {
      const timestamp = new Date().getTime();
      const payload = {
        sub: user._id,
        iat: timestamp,
        username: user.username,
      };
      const options = {
        expiresIn: '24',
      }
    
      return jwt.sigh(payload, secret, options)
     })
     res.status(201).json({user, token});
   })
   .catch(err => res.status(500).json(err))
  // const user = new User(req.body);
  // user.save().then(user => (res.status(200).send(user))).catch(err => (res.status(500).err))
  // create user takes in the username and password and saves a user.
  // our pre save hook should kick in here saving this user to the DB with an encrypted password.

  
};

 

module.exports = {
  createUser
};
