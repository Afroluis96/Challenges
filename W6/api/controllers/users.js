require('dotenv').config('../.env');

const UserModel = require('../models/users');

const roleHelper = require('../helpers/role');

const servicesToken = require('../services/jwtToken');

const  whiteListService  = require('../services/whiteList');

const login = (req, res) => {
  if (!req.body) res.status(400).send({ message: 'NO body found' });
  whiteListService.checkList(req.body.name)
    .then((reply) => {
      if (reply) { console.log(reply); return Promise.reject(new Error('Already Loged in')); }

      return UserModel.findOne({
        userName: req.body.name,
      }).populate('userRoleId');
    })
    .then((user) => {
      if (!user) return Promise.reject(new Error('Error trying to find the user'));
      if (req.body.password !== user.password) return Promise.reject(new Error('Passwords do not match'));
      return servicesToken.getToken(user);
    })
    .then((token) => {
      whiteListService.addToWhiteList(req.body.name, token);
      res.send({
        token,
      });
    })
    .catch((err) => {
      res.status(err.code || 500);
      res.send(err.message);
    });
};

const addUser = (req, res) => {
  if (!req.body) res.status(400).send({ message: 'NO body found' });
  const { user, password, role } = req.body;

  UserModel.findOne({ userName: user })
    .then((userOne) => {
      if (userOne) return Promise.reject(new Error('Username already exists'));
      return roleHelper.getRoleByName(role);
    })
    .then((roleFound) => {
      if (!roleFound) return Promise.reject(new Error('Couldnt find the userRole'));

      return newUser = new UserModel({
        userName: user,
        password,
        userRoleId: roleFound._id,
      }).save();
    })
    .then((saved) => {
      res.send(saved);
    })
    .catch((err) => {
      res.status(500).send({ message: `Error when creating user ${err.message}` });
    });
};

const logout = (req, res) => {
  whiteListService.checkList(req.body.name)
    .then((reply) => {
      if (!reply) return Promise.reject(new Error('This user it is not logged in'));

      return clientList.del(req.body.name);
    })
    .then((reply, err) => {
      if (err) return Promise.reject(new Error('Error when login out'));
      res.status(200).send('User LogedOut');
    }).catch((err) => {
      res.status(500).send({ message: `Error when creating user ${err.message}` });
    });
};

module.exports = {
  login,
  addUser,
  logout,
};
