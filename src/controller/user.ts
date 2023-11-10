import logger from '../utils/logger';
import { createJWT } from '../utils';
import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user';
import { StatusCodes } from 'http-status-codes';
import { createUser } from '../service/user';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const { _id, email } = await createUser(req.body);

    const payload = { _id, email };
    const accessToken = createJWT(payload);

    return res.status(StatusCodes.CREATED).json({ accessToken });
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.CONFLICT).send(e.message);
  }
}
