import { join, basename, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { cpSync } from 'node:fs';
import { writeFileSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import ejs from 'ejs';

import { input, confirm } from '@inquirer/prompts';

async function prompting() {
  const answers = {};
  const prompts = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Your project name',
      default: basename(resolve('./')),
    },
    {
      type: 'input',
      name: 'userName',
      message: 'Your Github username',
      default: 'newseru',
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'The package author',
      default: 'Santiago Miranda',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Your package description',
      default: 'Sample package',
    },
    {
      type: 'confirm',
      name: 'node',
      message: 'Is it a Node.js-only library?',
      default: false,
    },
  ];
  for (const item of prompts) {
    const { name, type, message } = item;
    if (type === 'input' && typeof item.default == 'string') {
      answers[name] = await input({ message, default: item.default });
    } else if (type === 'confirm' && typeof item.default == 'boolean') {
      answers[name] = await confirm({ message, default: item.default });
    } else {
      throw new Error(`Invalid prompt item ${item}`);
    }
  }
  return answers;
}

async function run() {
  const devDeps = ['eslint', 'vitest', 'prettier', 'rimraf', 'typescript'];
  const toCopyPath = join(__dirname, 'toCopy');
  const templatesPath = join(__dirname, 'templates');
  const answers = await prompting();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const includes = {
    authorName: answers.authorName,
    projectName: answers.projectName,
    userName: answers.userName,
    notOnlyNode: !answers.node,
    description: answers.description,
    date: `${year}-${month}-${day}`,
    year,
  };

  const foldersToCopy = readdirSync(toCopyPath);
  for (const folder of foldersToCopy) {
    console.log(`Copying folder ${folder}...`);
    cpSync(join(toCopyPath, folder), folder, { recursive: true });
  }
  const ls = readdirSync(templatesPath).filter((f) => f.endsWith('.ejs'));
  for (const file of ls) {
    console.log(`rendering ${file}...`);
    const content = await ejs.renderFile(join(templatesPath, file), includes);
    const name = file.replace(/\.ejs$/, '');
    console.log(`writing ${name}...`);
    writeFileSync(name, content);
  }
  console.log('Installing dev dependencies (this may take a while)...');
  execSync(`npm install -D ${devDeps.join(' ')}`, { stdio: 'inherit' });
}

run()
  .then(() => console.log('Done'))
  .catch(console.error);
