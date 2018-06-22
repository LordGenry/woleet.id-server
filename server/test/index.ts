/* tslint-env mocha */
/* tslint prefer-arrow-callback: "off" */
/* tslint import/no-extraneous-dependencies: "off" */

import 'mocha';
import 'chai-http';

import * as chai from 'chai'

chai.use(require('chai-http'));
chai.should();

import app from '../src/app'

let server = null;

before((done) => {
  server = app.listen(3000, () => console.info('Opened server'));
  setTimeout(done, 1000);
});

after((done) => {
  server.close((() => {
    console.info('Closed server');
    done();
  }));
});

export const request = () => chai.request(server)

const user = 'test';
const pass = 'pass';
export const basic = Buffer.from(`${user}:${pass}`).toString('base64');

export const token = '';

export const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export function assertError(done: () => any, status: number, message?: string) {
  return (res: ChaiHttp.Response) => {
    res.status.should.equal(status);
    res.body.should.have.property('status').that.equal(status);
    const messageTest = res.body.should.have.property('message');
    if (message) {
      messageTest.that.equal(message)
    }
    done();
  }
}