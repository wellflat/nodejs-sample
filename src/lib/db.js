import knex from 'knex';
import mockKnex from 'mock-knex';

export default connectDB => {
    return new Promise((resolve, reject) => {
        let credentilas = {
            client: 'sqlite3'
        };
        let db = null;
        if (process.env.NODE_ENV === 'test') {
            credentilas.connection = {};
            db = knex(credentilas);
            mockKnex.mock(db);
        } else {
            credentilas.connection = {
                filename: './test.db'
            };
            db = knex(credentilas);
            if (db == null) {
                reject("db connection error");
                return;
            }
        }
        return resolve(db);
    });
};
