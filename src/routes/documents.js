import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import credential from '../credential.json';

export default ({ config, db }) => {
    const router = Router();
    aws.config.update(credential);
    const s3 = new aws.S3();
    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: config.bucket,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: (req, file, cb) => {
                cb(null, {fieldName: file.originalname});
            },
            key: (req, file, cb) => {
                cb(null, Date.now().toString());
            }
        })
    });

    router.post('/', upload.single('file'), async (req, res) => {
        try {
            console.log(req.file);
            
            res.status(201).json({
                message: 'file upload success',
                etag: req.file.etag
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'file upload error' });
        }
    });

    return router;
};