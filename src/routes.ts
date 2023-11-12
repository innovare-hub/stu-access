import { Express, Request, Response } from 'express';
import { validate } from './middleware/validateResource';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { authUserSchema, createUserSchema } from './schema/user';
import { authHandler, createUserHandler } from './controller/user';

export default function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  });

  app.post('/users', validate(createUserSchema), createUserHandler);
  app.post('/auth', validate(authUserSchema), authHandler);
}
