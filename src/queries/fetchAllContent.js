import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import { client } from '../utils/graphqlClient.js';

const spinner = ora('Fetching sample content for all types...').start();

try {
  const map = JSON.parse(fs.readFileSync('src/data/content_map.json', 'utf-8'));
  const queryParts = map.map(m => 
    `${m.name.charAt(0).toLowerCase() + m.name.slice(1)}Collection(limit: 3) { items { sys { id } __typename } }`
  );
  const fullQuery = `query {\n${queryParts.join('\n')}\n}`;

  const data = await client.request(fullQuery);
  fs.writeFileSync('src/data/content_snapshot.json', JSON.stringify(data, null, 2));
  spinner.succeed(chalk.green('Content snapshot saved → src/data/content_snapshot.json'));
} catch (err) {
  spinner.fail(chalk.red('Failed to fetch content snapshot'));
  console.error(err);
}
