import { Router } from 'express';
import users from './users';
import documents from './documents';

export default ({ config, db }) => {
    const router = Router();

    router.use('/user', users({ config, db }));

    router.use('/document', documents({ config }));

    router.get('/', (req, res) => {
        console.log(req.session.user);
        res.status(200).json({ name: "node sample" });
    });

    return router;
};
