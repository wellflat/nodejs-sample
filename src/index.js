import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';

import connectDB from './lib/db';
import middleware from './middleware';
import { errorHandler } from './middleware/error';
import routes from './routes';
import config from './config.json';

import sourcemap from 'source-map-support';
sourcemap.install();

const app = express();
app.disable('x-powered-by');

// global middleware binding
app.use(morgan('dev'));
app.use(cors({ exposedHeaders: config.corsHeaders }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: config.bodyLimit,  type: 'application/*+json' }));
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    name: 'node-sample',
    cookie: {
        maxAge: null // 30*24*60*60*1000
    }
}));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.statusCode = 500;
  // Do not expose your error in production
  res.json({ error: err.message });
  next();
});

app.listen(process.env.PORT || config.port, async () => {
    try {
        const db = await connectDB();
        console.log(`Started on port ${config.port}`);
        // internal middleware
        app.use(middleware({ config, db }));
        // root entry point
        app.use('/', routes({ config, db }));
        // error middleware
        app.use(errorHandler);
    } catch(err) {
        console.error(err);
        process.exit(-1);
    }
});


// Graceful shutdown
process.on('SIGTERM', () => {
  // clearInterval(metricsInterval);

  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    process.exit(0);
  });
});


export default app;
