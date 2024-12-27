const redis=require('redis');
let redisClient;
async function getRedisClient() {
     redisClient = redis.createClient({
     socket: {
       host: '127.0.0.1', 
       port: 6379,        
     },
   });
 
   redisClient.on('error', (err) => {
     console.error('Redis Client Error', err);
   });

   
 
   await redisClient.connect();
   console.log('Redis connected successfully!');
   
 }