import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'power-assert';
import app from '../src/index';

chai.use(chaiHttp);

describe('/user', () => {
    let requester = null;
    const path = '/user';

    before(() => {
        requester = chai.request(app);
    });

    after(() => {
    })

    it('should return the all user data', (done) => {
        requester.get(path).end((err, res) => {
            assert.equal(res.status, 200);
            done();
        });
    });

    it('should regist a user data', (done) => {
        const data = { name: 'test user', age: 20 };
        requester.post(path).send(data).end((err, res) => {
            assert.equal(res.status, 201);
            assert.ok(res.body.user_id, "returns user_id");
            done();
        });
    });
});

describe('/user/:id', () => {
    let requester = null;
    const path = '/user/20';

    before(() => {
        requester = chai.request(app);
    });

    after(() => {
    })

    it('should return a user data', (done) => {
        requester.get(path).end((err, res) => {
            assert.equal(res.status, 200);
            const expected = {
                id: 20,
                name: "test user",
                age: 10
            };
            assert.deepEqual(res.body, expected);
            done();
        });
    });

});