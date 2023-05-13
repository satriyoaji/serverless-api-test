export default {
  port: 'PORT',

  postgresConfig: {
    host: 'POSTGRES_HOST',
    port: 'POSTGRES_PORT',
    username: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
  },

  redisConfig: {
    host: 'REDIS_HOST',
    port: 'REDIS_PORT',
    username: 'REDIS_USERNAME',
    password: 'REDIS_PASSWORD',
    database: 'REDIS_DB',
  },

  accessTokenExpiresIn: 'JWT_ACCESS_TOKEN_EXPIRED_HOURS',
  accessTokenPrivateKey: 'JWT_ACCESS_TOKEN_PRIVATE_KEY',
  accessTokenPublicKey: 'JWT_ACCESS_TOKEN_PUBLIC_KEY',
  refreshTokenPrivateKey: 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
  refreshTokenPublicKey: 'JWT_REFRESH_TOKEN_PUBLIC_KEY',

  smtp: {
    host: 'EMAIL_HOST',
    pass: 'EMAIL_PASS',
    port: 'EMAIL_PORT',
    user: 'EMAIL_USER',
  },
};
