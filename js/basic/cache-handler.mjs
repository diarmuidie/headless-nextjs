import { CacheHandler } from '@neshca/cache-handler';
import createLruHandler from '@neshca/cache-handler/local-lru';
import createRedisHandler from '@neshca/cache-handler/redis-stack';
// or if you are using Redis without the RedisJSON module
// import createRedisHandler from '@neshca/cache-handler/redis-strings';
import { createClient } from 'redis';
 
CacheHandler.onCreation(async () => {
  // always create a Redis client inside the `onCreation` callback
  const client = createClient({
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  });
 
  client.on('error', () => {});
 
  await client.connect();
 
  const redisHandler = await createRedisHandler({
    client,
    // timeout for the Redis client operations like `get` and `set`
    // after this timeout, the operation will be considered failed and the `localHandler` will be used
    timeoutMs: 5000,
  });
 
  const localHandler = createLruHandler();
 
  return {
    handlers: [redisHandler, localHandler],
  };
});
 
export default CacheHandler;
