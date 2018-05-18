const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = function(req, res) {
  // const { username, password } = req.body;
  const user = new User(req.body);
  user.save().then(user => (res.status(200).send(user))).catch(err => (res.status(500).err))
  // create user takes in the username and password and saves a user.
  // our pre save hook should kick in here saving this user to the DB with an encrypted password.
  
};

module.exports = {
  createUser
};
