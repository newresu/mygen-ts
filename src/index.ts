import { join, basename, resolve } from 'node:path';
import { exec } from 'node:child_process';

import camelCase from 'camelcase';
import { input, confirm } from '@inquirer/prompts';

type StringBoolObject = Record<string, string | boolean>;
type Prompt = {
  type: string;
  message: string;
  name: string;
  default?: string | boolean;
};
async function prompting() {
  const answers: StringBoolObject = {};
  const prompts: Prompt[] = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Your project name',
      default: basename(resolve('./')),
    },
    {
      type: 'input',
      name: 'org',
      message: 'GitHub organization',
      default: 'newseru',
    },
    {
      type: 'input',
      name: 'userName',
      message: 'Your name',
      default: 'newseru',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Your package description',
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
    if (type === 'input') {
      answers[name] = await input({ message });
    } else if (type === 'confirm') {
      answers[name] = await confirm({ message });
    }
  }
  return answers;
}

async function writing() {
  const deps = ['eslint', 'vitest', 'prettier', 'rimraf', 'typescript'];

  const templates = join(__dirname, 'templates');
  const answers = await prompting();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  if (typeof answers.name !== 'string') {
    throw new Error('Invalid name');
  }
  const camelName = camelCase(answers.name);
  const prefix = answers.org || '';
  const includes = {
    npmName: prefix + answers.name,
    name: answers.name,
    org: answers.org,
    userName: answers.userName,
    notOnlyNode: !answers.node,
    description: answers.description,
    date: `${year}-${month}-${day}`,
    year,
    camelName,
  };

  await exec(`cp -r ${join(__dirname, 'toCopy/*')} .`);
  await exec(`npm install -D ${deps.join(' ')}`);
}
