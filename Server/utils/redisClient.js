
const redis = require('redis');

const client = redis.createClient(); 

client.on('error', (err) => console.error('[REDIS] Error:', err));
client.on('connect', () => console.log('[REDIS] Connected'));

client.connect();

module.exports = client;
