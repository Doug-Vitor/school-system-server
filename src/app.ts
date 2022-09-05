import express, { Express } from 'express';

import { json, urlencoded } from 'body-parser';
import { setCors } from './application/middlewares/headers';

import routes from './application/routes';
import errorHandler from './application/middlewares/errorHandler';

const app: Express = express();

app.use(setCors);
app.use(json(), urlencoded({ extended: true }));

app.use('/api', routes);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running. Port: ${port}`));