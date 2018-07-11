require('dotenv').config('../.env');

const jwt = require('jsonwebtoken');

const { superSecret } = process.env;

const redis = require('redis');

const client = require('../services/whiteList');

const verifyToken = (token) => new Promise ((resolve, reject)=>{
  console.log('token:',token);
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
        
        req.decoded = decoded;
        console.log('req.decoded:',req.decoded);
       next();
      })
      .catch(error =>{
        res.status(400).send({message:`Invalid token provided ${error}`});
      })
  
}

module.exports = {
    authentication,
    verifyToken,
    seeHeader,
    verifyUserCreation
};