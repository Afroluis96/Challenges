require('dotenv').config('../.env');

const UserModel = require('../models/users');

const roleHelper = require('../helpers/role');

const services = require('../services/jwtToken');


const login = (req, res) => {
  if (!req.body) res.status(400).send({ message: 'NO body found' });
  UserModel.findOne({
    userName: req.body.name,
  })
    .then((user) => {
      if (!user) return Promise.reject(new Error('Error trying to finde user'));
      if (req.body.password !== user.password) return Promise.reject(new Error('Passwords do not match'));
      return services.getToken(user);
    })
    .then((token) => {
      res.send({
        success: true,
        message: 'Enjoy your token!',
        token,
      });
    })
    .catch((err) => {
      res.status(err.code || 500);
      res.send(err.message);
    });
};

const signUp = (req, res) => {
  if (!req.body) res.status(400).send({ message: 'NO body found' });
  const { user, password } = req.body;
  return UserModel.findOne({ userName: user })
    .then((userOne) => {
      if (userOne) return Promise.reject(new Error('Username already exists'));
      return roleHelper.getRoleByName('Client');
    })
    .then((role) => {
      if (!role) return Promise.reject(new Error('Couldnt find the userRole'));
      
      return newUser = new UserModel({
        userName: user,
        password,
        userRoleId: role._id,
      }).save();
    })
    .then((saved) => {
      res.send(saved);
    })
    .catch((err) => {
      res.status(500).send({ message: `Error when creating user ${err}` });
    });
};

const logout = (req, res) => {
  res.send('Entro');
};

module.exports = {
  login,
  signUp,
  logout,
};
