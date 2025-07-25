import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

// import BaseRouter from '@src/routes';

// import Paths from '@src/routes/common/Paths';
import Env from '@src/common/Env';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import { NodeEnvs } from '@src/common/constants';
import routes from '@src/routes';

import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../swaggerConfig';

import chalk from 'chalk';
import { IReq, IRes } from './controllers/common';
import { IncomingMessage } from 'http';

/******************************************************************************
                                Variables
******************************************************************************/

const app = express();


// **** Setup

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// morgan.token('format1', (req, res) => {
//   const method = req.method;
//   const url = req.url;
//   const status = res.statusCode;
//   const clientIP = req.headers['X-Forwarded-For'] || req.socket.remoteAddress;
//   const colorClientIP = chalk.bgBlue(clientIP);
//   // const responseTime = res.responseTime + 'ms';

//   const coloredMethod = method === 'GET' ? chalk.green(method) : chalk.yellow(method);
//   const coloredUrl = chalk.blue(url);
//   const coloredStatus = status >= 400 ? chalk.red(status) : chalk.green(status);
//   // const coloredResponseTime = chalk.yellow(responseTime);

//   // return `${new Date().toISOString()} - ${coloredMethod} ${coloredUrl} - ${coloredStatus} - ${coloredResponseTime}`;
//   return `${colorClientIP} [${new Date().toISOString()}] ${coloredMethod} ${coloredUrl} - ${coloredStatus}`;
// });

// Show routes called in console during development
if (Env.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (Env.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Add APIs, must be after middleware
// app.use(Paths.Base, BaseRouter);
app.use('/v1', routes);
// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (Env.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});


// **** Front-End Content

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Nav to users pg by default
app.get('/', (_: Request, res: Response) => {
  res.send('Marknotes server is on running');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Redirect to login if not logged in.
// app.get('/users', (_: Request, res: Response) => {
//   return res.sendFile('users.html', { root: viewsDir });
// });


/******************************************************************************
                                Export default
******************************************************************************/

export default app;
