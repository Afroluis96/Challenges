require('dotenv').config('../.env');

const jwt = require('jsonwebtoken');

const { superSecret } = process.env;

const verifyToken = (token) => new Promise ((resolve, reject)=>{
  jwt.verify(token,superSecret, function(err, decoded) {      
    if (err) {
      return reject(new Error(`Failed to authenticate token. ${err}` ));    
    } else {
      resolve(decoded);
      
    }
  });
})

const authentication = (req, res, next) =>{
    let token = req.body.token || req.query.token || req.headers['Authorization'];
      verifyToken(token)
      .then((decoded) =>{
        req.decoded = decoded;    
       next();
      })
      .catch(error =>{
        res.status(400).send({message:'Invalid token provided'});
      })
  
}

module.exports = {
    authentication
};