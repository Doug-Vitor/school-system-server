import express, { Express } from 'express';

import cors from 'cors';
import corsConfigs from './application/configs/cors';

import { json, urlencoded } from 'body-parser';

import routes from './application/routes';
import errorHandler from './application/middlewares/errorHandler';

const app: Express = express();

app.use(cors(corsConfigs));
app.use(json(), urlencoded({ extended: true }));

app.use('/api', routes);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running. Port: ${port}`));