import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'power-assert';
import app from '../src/index';

chai.use(chaiHttp);

describe('/', () => {
    let requester = null;

    before(() => {
        requester = chai.request(app);
    });

    after(() => {
    })

    it('should return a json response', (done) => {
        requester.get('/').end((err, res) => {
            assert.equal(res.status, 200);
            const expected = { name: 'node sample' };
            assert.deepEqual(res.body, expected);
            done();
        });
    });
});