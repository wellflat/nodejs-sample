import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'power-assert';
import app from '../src/index';

chai.use(chaiHttp);

describe('/user', () => {
    let requester = null;

    before(() => {
        console.log('----- test start -----');
        requester = chai.request(app);
    });

    after(() => {
        console.log('----- test complete -----');
    })

    it('should return the all user data', (done) => {
        requester.get('/user').end((err, res) => {
            assert.equal(res.status, 200);
            done();
        });
    });

    it('should registration a user data', (done) => {
        const data = { name: 'test user', age: 20 };
        requester.post('/user').send(data).end((err, res) => {
            assert.equal(res.status, 201);
            done();
        });
    });
});