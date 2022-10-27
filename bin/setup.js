import fs from 'fs';

if (!fs.existsSync('.git/hooks/package.json')) {
  fs.writeFileSync('.git/hooks/package.json', '{ "private": true, "type": "commonjs"}');
  console.log('Hooks compatilibity enabled.');
} else {
  console.log('Hooks configuration file already exists. Nothing to be done');
}