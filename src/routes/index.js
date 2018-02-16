import { Router } from 'express';
import users from './users';

export default ({ config, db }) => {
    const router = Router();

    router.use('/user', users({ config, db }));

    router.get('/', (req, res) => {
        console.log(req.session.user);
        res.status(200).json({ name: "node sample" });
    });

    return router;
};
