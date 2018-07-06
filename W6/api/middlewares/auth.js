require('dotenv').config('../.env');
//superSecret = applaudoStudios
const { superSecret } = process.env;

const authentication = (req, res, next) =>{
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
     // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token,superSecret, function(err, decoded) {      
      if (err) {
        return Promise.reject(new Error('Failed to authenticate token.' ));    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  }else{
      return Promise.reject(new Error('No token found' ));  
  }
}

module.exports = {
    authentication
};