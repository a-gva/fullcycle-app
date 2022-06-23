import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(require('./routes'));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Caso tenha problema na rota
  if (err) {
    return (
      response
        // .status(err as number)
        .json({ status: 'error', message: err.message })
    );
  }
  // Problemas após chegada na rota
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.BACKEND_PORT);
console.log(
  `⚙️  Backend Server | Running on port: ${process.env.BACKEND_PORT} ⚙️`
);
