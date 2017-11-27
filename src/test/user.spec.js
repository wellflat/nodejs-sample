import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mockKnex from 'mock-knex';
import app from '../index';

chai.use(chaiHttp);

const tracker = mockKnex.getTracker();

describe('/user', () => {
    tracker.install();
    before(() => {
        tracker.on('query', (query) => {
            const results = {
                results: [
                    { name: 'foo', age: 20 },
                    { name: 'bar', age: 30 }
                ]
            };
            query.response(results);
        });
    });
    it('should return the all user data', (done) => {
        chai.request(app)
        .get('/user')
        .end((err, res) => {
            console.log(res);
        });
    });
});