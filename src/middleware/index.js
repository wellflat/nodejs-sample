import { Router } from 'express';

export default ({ config, db }) => {
    const router = Router();

    router.use((req, res, next) => {
        console.log(`Time: ${Date.now()}`);
        next();
    });

    return router;
};
