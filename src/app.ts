import express, { Express, Request, Response } from 'express';
import { setCors } from './application/middlewares/Headers';

const app: Express = express();

app.use(setCors);

app.get('/', (req: Request, res: Response) => {
  res.send('My first API with typescript');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running. Port: ${port}`);
});