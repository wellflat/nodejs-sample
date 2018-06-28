import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import multer from 'multer';

export default ({ config, db }) => {
    const router = Router();
    const upload = multer({ dest: 'uploads/' });

    router.post('/', upload.any(), async (req, res) => {
        try {
            console.log(req.files);
            
            res.status(201).json({
                message: 'file upload success',
                etag: 1
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'file upload error' });
        }
    });

    return router;
};