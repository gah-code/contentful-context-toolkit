import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';

const spinner = ora('Generating detailed schema documentation...').start();

try {
  if (!fs.existsSync('docs')) fs.mkdirSync('docs', { recursive: true });

  const map = JSON.parse(fs.readFileSync('src/data/content_map.json', 'utf-8'));
  const snapshot = JSON.parse(
    fs.readFileSync('src/data/content_snapshot.json', 'utf-8')
  );
  const schema = JSON.parse(fs.readFileSync('src/data/schema.json', 'utf-8'));

  const excluded = ['Asset', 'Entry', 'Link', 'Sys'];
  const publishable = map.filter((m) => !excluded.includes(m.name));

  // Build a quick lookup of types and their field definitions
  const typeLookup = {};
  for (const type of schema.__schema
    ? schema.__schema.types
    : schema.data.__schema.types) {
    if (type.fields) {
      typeLookup[type.name] = type.fields.map((f) => ({
        name: f.name,
        type: f.type?.name || f.type?.ofType?.name || 'Unknown',
      }));
    }
  }

  let markdown = `# 🧩 Contentful Schema Documentation (with Field Types)\n\n`;
  markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;
  markdown += `This document includes field names and their corresponding types extracted from your Contentful GraphQL schema.\n\n---\n`;

  for (const model of publishable) {
    const collectionKey =
      model.name.charAt(0).toLowerCase() + model.name.slice(1) + 'Collection';
    const count = snapshot[collectionKey]?.items?.length ?? 0;

    markdown += `\n## ${model.name}\n`;
    markdown += `**Entries fetched:** ${count}\n\n`;
    markdown += `**Fields:**\n`;

    const fields = typeLookup[model.name] || [];
    const fieldLines =
      fields.length > 0
        ? fields.map((f) => `- ${f.name}: ${f.type}`).join('\n')
        : model.fields.map((f) => `- ${f}: (unknown)`);

    markdown += fieldLines + '\n';
    markdown += `\n---\n`;
  }

  fs.writeFileSync('docs/schema_docs.md', markdown);
  spinner.succeed(
    chalk.green('Detailed documentation generated → docs/schema_docs.md')
  );
} catch (err) {
  spinner.fail(chalk.red('Failed to generate detailed schema documentation.'));
  console.error(err);
}
