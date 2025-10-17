import { client } from '../utils/graphqlClient.js';
import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';

const spinner = ora('Fetching schema via introspection...').start();

const query = `
  query {
    __schema {
      types {
        name
        kind
        fields { name }
      }
    }
  }
`;

try {
  const data = await client.request(query);
  fs.writeFileSync('src/data/schema.json', JSON.stringify(data, null, 2));
  spinner.succeed(chalk.green('Schema saved → src/data/schema.json'));
} catch (err) {
  spinner.fail(chalk.red('Failed to fetch schema'));
  console.error(err);
}
