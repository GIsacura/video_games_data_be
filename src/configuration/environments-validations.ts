import * as joi from 'joi';

export const schema = joi.object({
  //? String de conexión
  DB_URL: joi.string().required(),
});
