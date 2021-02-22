import consola from 'consola';
import fs from 'fs';
import path from 'path';

const date = process.argv.find((arg) => /^\d{4}-\d{2}-\d{2}$/.test(arg));

if (!date) {
  consola.error('The date option is required.');

  process.exit(1);
}

if (Number.isNaN(Number(new Date(date)))) {
  consola.error(`The date option value "${date}" is invalid.`);

  process.exit(1);
}

const FILE_PATH = path.join(__dirname, '../assets/changelogs', `${date}.yml`);
const YAML_TEMPLATE = `#
# category: feat | bugfix | perf
# image: /changelog/<date>/<file-name>
#

- title: \n  category: \n  url: \n  image: \n  description: |
    \n`;

fs.writeFileSync(FILE_PATH, YAML_TEMPLATE, 'utf-8');

consola.success(`Make a new changelog file on /assets/changelogs/${date}.yml`);
