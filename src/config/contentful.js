import dotenv from 'dotenv';
dotenv.config();

export const config = {
  space: process.env.CONTENTFUL_SPACE_ID,
  env: process.env.CONTENTFUL_ENVIRONMENT,
  token: process.env.CONTENTFUL_CDA_TOKEN,
  endpoint: process.env.CONTENTFUL_GRAPHQL_ENDPOINT
};
