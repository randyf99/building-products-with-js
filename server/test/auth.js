// npm packages
import test from 'tape';
import request from 'supertest';
import {spawn} from 'child_process';

// our packages
import {db as dbConfig} from '../config';
import {thinky, r} from '../src/db';
import app from '../src/app';

const reqlite = spawn('reqlite', [], {detached: true});

reqlite.stderr.on('data', () => {
  thinky.dbReady().then(() => {
    // clean the database
    test(async (t) => {
      await r.db(dbConfig.db).table('User').delete();
      t.end();
    });

    test('Should register with given username and password', (t) => {
      request(app)
       .post('/api/register')
       .send({login: 'test', password: '123', passwordRepeat: '123'})
       .expect(201)
       .end((err) => {
         t.error(err, 'No error');
         t.end();
       });
    });

    test('Should fail to register with same username', (t) => {
      request(app)
       .post('/api/register')
       .send({login: 'test', password: 'aaa', passwordRepeat: 'aaa'})
       .expect(403)
       .end((err, res) => {
         const expectedBody = {error: 'User already exists!'};
         const actualBody = res.body;

         t.error(err, 'No error');
         t.deepEqual(actualBody, expectedBody, 'Retrieve body');
         t.end();
       });
    });

    test('Should fail to register with mismatching passwords', (t) => {
      request(app)
        .post('/api/register')
        .send({login: 'test', password: '123', passwordRepeat: '321'})
        .expect(400)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          const expectedBody = {error: 'Passwords do not match'};
          const actualBody = res.body;

          t.error(err, 'No error');
          t.deepEqual(actualBody, expectedBody, 'Retrieve body');
          t.end();
        });
    });

    // close db connections
    test((t) => {
      setImmediate(() => r.getPoolMaster().drain());
      reqlite.kill();
      t.end();
    });
  });
});
