import supertest from 'supertest';
import app from '../../app';
import * as dotenv from 'dotenv';
import { expect, it, jest, test } from '@jest/globals';

dotenv.config();
global.supertestedApp = supertest(app);
global.expect = expect;
global.jest = jest;
global.test = test;
global.it = it