const redis = require('redis');

const PORT = process.env.redisPort || 6379;
const HOST = process.env.redisHost || '127.0.0.1';

const clientList = redis.createClient(PORT, HOST);

clientList.on('connect', function() {
    console.log('connected redis');
});

const checkList = name => new Promise((resolve, reject) => {
    clientList.get(name, (err, reply) =>{
        console.log('check ',reply);
    })
    clientList.exists(name, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  });

const addToWhiteList = (name, token) => {
  clientList.set(name, token);
  
  clientList.expire(name, 43200);
}

const deleteFromList = (name) => new Promise((resolve, reject) =>{
    clientList.del(name, (err, reply) =>{
        if(err) reject(err)
        resolve(reply)
    })
})
module.exports = { 
    clientList,
    checkList,
    addToWhiteList,
    deleteFromList
}
