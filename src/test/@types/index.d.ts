// Globals coming from scripts/setup
declare const supertestedApp: supertest.SuperTest<supertest.Test>;
declare const expect: import('@jest/expect').JestExpect;
declare const jest: import('@jest/environment').Jest;
declare const test: import('@jest/types').Global.GlobalAdditions['test'];
declare const it: import('@jest/types').Global.GlobalAdditions['it'];