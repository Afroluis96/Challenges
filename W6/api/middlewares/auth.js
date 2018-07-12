require('dotenv').config('../.env');

const jwt = require('jsonwebtoken');

const { superSecret } = process.env;


const  whiteListService  = require('../services/whiteList');

const verifyToken = (token) => new Promise ((resolve, reject)=>{
  jwt.verify(token,superSecret, function(err, decoded) {      
    if (err) {
      return reject(new Error(`Failed to authenticate token. ${err}` ));    
    } else {
      
      resolve(decoded);
    }
  });
});

const verifyUserCreation = (req, res, next) => {
  
  const sessionRole = req.decoded.role;
  const roleToCreate = req.body.role;
  if(!sessionRole && roleToCreate !== 'Client') res.status(403).send({ message:'You are not allowed to create this kind of user'});

  else if(sessionRole !== 'Administrator') res.status(403).send({ message:'You are not allowed to create users'});
  
  else next();
}

const seeHeader = (req, res, next) =>{
  let token = req.body.token || req.query.token || req.headers.authorization;
  if(token) return authentication(req, res, next, token);
  next();
}

const authentication = (req, res, next, token) =>{
    
      verifyToken(token)
      .then((decoded) =>{
        return Promise.all([whiteListService.checkList(decoded.name), decoded]);
      })
      .then(([reply, decoded]) =>{
        if(!reply) return Promise.reject(new Error('Not allowed'));
        
        req.decoded = decoded;
        next();
      
      })
      .catch(error =>{
        res.status(400).send(error.message);
      })
  
}

const logout = (req, res) => {
  whiteListService.checkList(req.decoded.name)
    .then((reply) => {
      if (!reply) return Promise.reject(new Error('This user it is not logged in'));

      return whiteListService.deleteFromList(req.decoded.name);
    })
    .then(reply => {
      if (!reply) return Promise.reject(new Error('Error when login out'));
      res.status(200).send('User LogedOut');
    }).catch((err) => {
      res.status(500).send({ message: `Error when creating user ${err.message}` });
    });
};

const verifyAddSchedule = () =>{
  const sessionRole = req.decoded.role;
  const roleToCreate = req.body.role;
  if(!sessionRole && roleToCreate !== 'Client') res.status(403).send({ message:'You are not allowed to create this kind of user'});

  else if(sessionRole !== 'Administrator') res.status(403).send({ message:'You are not allowed to create users'});
  
  else next();
}

module.exports = {
    authentication,
    verifyToken,
    seeHeader,
    verifyUserCreation,
    logout,
    verifyAddSchedule
};