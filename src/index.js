import * as dotenv from 'dotenv';
import { bootstrap } from "./bootstrap.js";
import app from './app.js';

dotenv.config()

async function start() {
  await bootstrap();

  app.listen(3000, () => {
    console.log('Server running');
  });
};

start();