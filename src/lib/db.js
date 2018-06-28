import knex from 'knex';
import mysql from 'mysql2';

export default connectDB => {
    return new Promise((resolve, reject) => {
        let credentials = {
            client: 'sqlite3'
        };
        let db = null;
        if (process.env.NODE_ENV === 'test') {
            credentials.connection = {
                filename: './resource/test.db'
            };
        } else {
            credentials.connection = {
                filename: './resource/user.db'
            };
        }
        db = knex(credentials);
        db.raw('SELECT 1 AS dbIsUp').then(() => {
            resolve(db);
        }).catch(err => {
            reject(err);
        });
    });
};


export function connectMySQL() {
    let credentials = {
        host: 'localhost',
        user: 'root',
        password: 'password'
    };
    if (process.env.NODE_ENV === 'test') {
        credentials.host = 'localhost';
    } else {
        credentials.host = '';
    }
    const db = mysql.createConnection(credentials);
    db.connect()
    return db;
}
