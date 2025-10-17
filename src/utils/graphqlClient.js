import { GraphQLClient } from 'graphql-request';
import { config } from '../config/contentful.js';

export const client = new GraphQLClient(config.endpoint, {
  headers: { Authorization: `Bearer ${config.token}` }
});
