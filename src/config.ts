import { NodeEnv } from './types/utils';
import dotenv from 'dotenv';

const envPath =
  process.env.NODE_ENV === NodeEnv.DEVELOPMENT
    ? '.env.development'
    : '.env.production';

dotenv.config({
  path: envPath,
});

const config = {
  // Airtable
  AIRTABLE_API_TOKEN: process.env.AIRTABLE_API_TOKEN || '',
  // Stripe
  STRIPE_API_KEY: process.env.STRIPE_API_KEY || '',
  // Intercom
  INTERCOM_API_BASE_URL: process.env.INTERCOM_API_BASE_URL || '',
  INTERCOM_API_TOKEN: process.env.INTERCOM_API_TOKEN || '',
  INTERCOM_API_VERSION: process.env.INTERCOM_API_VERSION || '',
  // Geolocation
  GEOLOCATION_API_BASE_URL: process.env.GEOLOCATION_API_BASE_URL || '',
  GEOLOCATION_API_TOKEN: process.env.GEOLOCATION_API_TOKEN || '',
  // Instagram Service
  INSTAGRAM_SERVICE_API_BASE_URL:
    process.env.INSTAGRAM_SERVICE_API_BASE_URL || '',
  // Chargebee
  CHARGEBEE_API_KEY: process.env.CHARGEBEE_API_KEY || '',
  CHARGEBEE_SITE_ID: process.env.CHARGEBEE_SITE_ID || '',
};

// eslint-disable-next-line no-restricted-syntax
for (const key in config) {
  if (!config[key as keyof typeof config]) {
    console.error(`Missing ${key} in .env`);
    process.exit(1);
  }
}

export default config;
