import { Router } from 'express';

export default ({ config, db }) => {
    const router = Router();

    router.use((req, res, next) => {
        console.log(`Time: ${Date.now()}`);
        if (!req.session.user) {
            req.session.user = { id: 1, name: 'wellflat' };
        }
        next();
    });
    return router;
};
