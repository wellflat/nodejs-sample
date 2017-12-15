import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import connectDB from './lib/db';
import middleware from './middleware';
import routes from './routes';
import config from './config.json';
import sourcemap from 'source-map-support';
sourcemap.install();

const app = express();

// middleware binding
app.use(morgan('dev'));
app.use(cors({ exposedHeaders: config.corsHeaders }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: config.bodyLimit }));

app.listen(process.env.PORT || config.port, async () => {
    try {
        const db = await connectDB();
        console.log(`Started on port ${config.port}`);

        // internal middleware
        app.use(middleware({ config, db }));

        // root entry point
        app.use('/', routes({ config, db }));
    } catch(err) {
        console.error(err);
    }
});

export default app;