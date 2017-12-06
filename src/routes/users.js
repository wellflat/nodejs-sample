import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';

export default ({ config, db }) => {
    const router = Router();

    router.get('/', async (req, res) => {
        try {
            const rows = await db('test');
            res.status(200).json({ results: rows });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'select error' });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const userId = req.params.id;
            const rows = await db('test').where('id', userId);
            if (rows.length == 0) {
                res.status(404).json({ message: 'user not found' });
            } else {
                res.status(200).json(rows[0]);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal db error' });
        }
    });

    router.post('/', async (req, res) => {
        try {
            const data = {
                name: 'test user',
                age: 10
            };
            let userId = null;
            await db.transaction(async trx => {
                try {
                    const id = await db('test').transacting(trx).insert(data);
                    await trx.commit();
                    userId = id[0];
                } catch (err) {
                    await trx.rollback();
                    throw err;
                }
            });
            res.status(201).json({
                message: 'user regstration success',
                user_id: userId
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal db error' });
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const data = {
                name: 'test user (update)',
                age: 11
            };
            const userId = req.params.id;
            let updated = false;
            await db.transaction(async trx => {
                try {
                    const affected = db('test').transacting(trx).where('id', userId).update(data);
                    updated = (affected == 1);
                    await trx.commit();
                } catch (err) {
                    await trx.rollback();
                    throw err;
                }
            });
            if (updated) {
                res.status(200).json({
                    message: 'user update success',
                    user_id: userId
                });
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal db error' });
        }
    });

    router.delete('/:id', (req, res) => {
        const userId = req.params.id;
        let deleted = false;
        db.transaction(trx => {
            db('test').transacting(trx).where('id', userId).del().then(affected => {
                deleted = (affected == 1);
            }).then(trx.commit).catch(trx.rollback)
        }).then(result => {
            if (deleted) {
                res.status(200).json({
                    message: 'user deletion success',
                    user_id: userId
                });
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({ message: 'internal db error' });
        });
    });

    return router;
};