import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';

const spinner = ora('Generating content map...').start();

try {
  const schema = JSON.parse(fs.readFileSync('src/data/schema.json', 'utf-8'));
  const types = (schema.data?.__schema || schema.__schema).types;

  const contentTypes = types.filter(
    (t) =>
      t.fields &&
      t.fields.length &&
      types.some((ct) => ct.name === `${t.name}Collection`)
  );

  const map = contentTypes.map((t) => ({
    name: t.name,
    fields: t.fields.map((f) => f.name),
  }));

  fs.writeFileSync('src/data/content_map.json', JSON.stringify(map, null, 2));
  spinner.succeed(
    chalk.green(`Content map created → src/data/content_map.json`)
  );
} catch (err) {
  spinner.fail(chalk.red('Error generating content map'));
  console.error(err);
}
