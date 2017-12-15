import { Router } from 'express';

export default ({ config, db }) => {
    const router = Router();

    router.use((req, res, next) => {
        console.log(`Time: ${Date.now()}`);
        next();
    });

    // @todo implement
    router.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ message: err });
    });

    return router;
};
