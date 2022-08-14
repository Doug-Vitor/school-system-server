import express, { Express, Request, Response } from 'express';

import { json, urlencoded } from 'body-parser';
import { setCors } from './application/middlewares/Headers';

import routes from './application/routes/index';

const app: Express = express();

app.use(setCors);
app.use(json(), urlencoded({ extended: true }));

app.use(routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running. Port: ${port}`));