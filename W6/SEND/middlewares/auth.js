require('dotenv').config('../.env');

const jwt = require('jsonwebtoken');

const { superSecret } = process.env;

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

const verifyUser = (req, res, next) => {
  const role = req.decoded;
  console.log('role in veryfy: ',role);
  next();
}

const seeHeader = (req, res, next) =>{
  let token = req.body.token || req.query.token || req.headers.authorization;
  if(token)
  return authentication(req, res, next)
  next();
}

const authentication = (req, res, next) =>{
  let token = req.body.token || req.query.token || req.headers.authorization;
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
    verifyUser,
    seeHeader
};