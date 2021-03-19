import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';

async function main() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      return response.status(500).json({ message: error.message });
    }
  );

  app.listen(3333, () => {
    console.log('⚡ running on port 3333');
  });
}

main();
