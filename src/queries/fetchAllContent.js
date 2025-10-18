import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import { client } from '../utils/graphqlClient.js';

const spinner = ora('Fetching enriched content snapshot...').start();

try {
  // Ensure the data directory exists
  if (!fs.existsSync('src/data')) fs.mkdirSync('src/data', { recursive: true });

  const map = JSON.parse(fs.readFileSync('src/data/content_map.json', 'utf-8'));

  // Filter out system and infrastructural types
  const excluded = ['Asset', 'Entry', 'Link', 'Sys'];
  const contentModels = map.filter((m) => !excluded.includes(m.name));

  spinner.text = `Building unified GraphQL query for ${contentModels.length} content types...`;

  // Build one query combining all collections
  const queryParts = contentModels.map((m) => {
    const typeName =
      m.name.charAt(0).toLowerCase() + m.name.slice(1) + 'Collection';

    // Pick a few sensible fields if they exist
    const fields = m.fields.filter((f) =>
      ['title', 'slug', 'description', 'name', 'heading', 'text'].includes(f)
    );

    // Always include sys.id, __typename, and try to grab image if possible
    const fieldList = [
      'sys { id }',
      '__typename',
      ...fields,
      m.fields.includes('image') ? 'image { url title description }' : '',
    ].filter(Boolean);

    return `
      ${typeName}(limit: 3) {
        items {
          ${fieldList.join('\n          ')}
        }
      }`;
  });

  const fullQuery = `query {
${queryParts.join('\n')}
}`;

  spinner.text = 'Requesting content from Contentful...';
  const data = await client.request(fullQuery);

  fs.writeFileSync(
    'src/data/content_snapshot.json',
    JSON.stringify(data, null, 2)
  );

  spinner.succeed(
    chalk.green(`Content snapshot updated → src/data/content_snapshot.json`)
  );

  // Log a summary
  const typesFetched = Object.keys(data);
  console.log(chalk.cyan(`Fetched ${typesFetched.length} content types:`));
  for (const key of typesFetched) {
    const count = data[key]?.items?.length ?? 0;
    console.log(chalk.gray(`  ✔ ${key} (${count} items)`));
  }
} catch (err) {
  spinner.fail(chalk.red('Failed to fetch enriched content snapshot.'));
  console.error(err);
}

// V1
// import fs from 'fs';
// import ora from 'ora';
// import chalk from 'chalk';
// import { client } from '../utils/graphqlClient.js';

// const spinner = ora('Fetching sample content for all types...').start();

// try {
//   const map = JSON.parse(fs.readFileSync('src/data/content_map.json', 'utf-8'));
//   const queryParts = map.map(m =>
//     `${m.name.charAt(0).toLowerCase() + m.name.slice(1)}Collection(limit: 3) { items { sys { id } __typename } }`
//   );
//   const fullQuery = `query {\n${queryParts.join('\n')}\n}`;

//   const data = await client.request(fullQuery);
//   fs.writeFileSync('src/data/content_snapshot.json', JSON.stringify(data, null, 2));
//   spinner.succeed(chalk.green('Content snapshot saved → src/data/content_snapshot.json'));
// } catch (err) {
//   spinner.fail(chalk.red('Failed to fetch content snapshot'));
//   console.error(err);
// }
