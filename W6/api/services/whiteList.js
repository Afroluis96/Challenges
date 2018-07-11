const redis = require('redis');

const PORT = process.env.redisPort || 6379;
const HOST = process.env.redisHost || '127.0.0.1';

const clientList = redis.createClient(PORT, HOST);

clientList.on('connect', function() {
    console.log('connected redis');
});

module.exports = { 
    clientList
}
