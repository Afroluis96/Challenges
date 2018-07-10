const request = require('request');

const searchMovieByUrl = (url) => new Promise((resolve,reject) => {
    request(url, function(error, response, body){
      if(error) return reject(error); 
         resolve(body);
      })
  });

module.exports = {
    searchMovieByUrl
}