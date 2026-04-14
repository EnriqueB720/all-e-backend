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
  BASE_SEPOLIA_RPC_URL: string;
  DEPLOYER_PRIVATE_KEY: string;
  WATCH_CONTRACT_ADDRESS: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
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
  BASE_SEPOLIA_RPC_URL: Joi.string().uri().required(),
  DEPLOYER_PRIVATE_KEY: Joi.string().length(64).required(),
  WATCH_CONTRACT_ADDRESS: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required(),
  REDIS_HOST: Joi.string().default('127.0.0.1'),
  REDIS_PORT: Joi.number().default(6379),
});

export { EnvVariables };

export default ENV_VARIABLES_SCHEMA;
