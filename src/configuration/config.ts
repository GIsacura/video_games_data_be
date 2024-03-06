import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const config = {
    mongo: { dbURI: process.env.DB_URL },
  };
  console.log(
    '🚀 ~ file: config.ts:31 ~ registerAs ~ config:',
    config.mongo.dbURI,
  );

  return config;
});
