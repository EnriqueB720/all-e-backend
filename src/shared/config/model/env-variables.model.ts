import * as Joi from 'joi';

import Environment from './environment.enum';

const { LOCAL, DEVELOPMENT, STAGING, PRODUCTION } = Environment;

interface EnvVariables {
  JWT_SECRET: string;
  NODE_ENV: Environment;
  PORT: number;
  DATABASE_URL: string;
  PINATA_JWT: string;
  PINATA_GATEWAY: string;
  RESEND_API_KEY: string;
  RESEND_FROM: string;
  APP_URL: string;
  CONTACT_EMAIL: string;
  CORS_ORIGINS: string;
}

const ENV_VARIABLES_SCHEMA = Joi.object<EnvVariables>({
  NODE_ENV: Joi.string()
    .valid(LOCAL, DEVELOPMENT, STAGING, PRODUCTION)
    .default(LOCAL),
  PORT: Joi.number().default(5000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  PINATA_JWT: Joi.string().required(),
  PINATA_GATEWAY: Joi.string().required(),
  RESEND_API_KEY: Joi.string().required(),
  RESEND_FROM: Joi.string().required(),
  APP_URL: Joi.string().required(),
  CONTACT_EMAIL: Joi.string().email().required(),
  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),
}).unknown(true);

export { EnvVariables };

export default ENV_VARIABLES_SCHEMA;
