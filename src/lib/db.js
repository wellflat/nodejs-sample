import knex from 'knex';

export default connectDB => {
    return new Promise((resolve, reject) => {
        let credentilas = {
            client: 'sqlite3'
        };
        let db = null;
        if (process.env.NODE_ENV === 'test') {
            credentilas.connection = {
                filename: './test.db'
            };
        } else {
            credentilas.connection = {
                filename: './test.db'
            };
        }
        db = knex(credentilas);
        db.raw('SELECT 1 AS dbIsUp').then(() => {
            resolve(db);
        }).catch(err => {
            reject(err);
        });
    });
};
