import express, { Express, Request, Response } from 'express';

import { json, urlencoded } from 'body-parser';
import { setCors } from './application/middlewares/Headers';

import teacherRouter from './application/routes/teacherRouter';

const app: Express = express();

app.use(setCors);
app.use(json(), urlencoded({ extended: true }));

app.get('/', (_: Request, res: Response) => {
  res.send('My first API with typescript');
});

app.use('/teacher', teacherRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running. Port: ${port}`);
});