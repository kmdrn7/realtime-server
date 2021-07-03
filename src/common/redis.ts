import {env} from "./env";

export const redisOptions = {
  host: env.REDIS_HOST,
  port: parseInt(env.REDIS_PORT),
  retryStrategy: (times: any) => {
    return Math.min(times * 50, 2000);
  },
};