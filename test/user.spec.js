import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);
const expect = chai.expect;

describe('/user', () => {
    
    it('should return the all user data', (done) => {
        chai.request(app)
        .get('/user')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should registration a user data', (done) => {
        chai.request(app)
        .post('/user')
        .send({ name: 'test user', age: 20 })
        .end((err, res) => {
            expect(res).to.have.status(201);
            done();
        });
    });
});