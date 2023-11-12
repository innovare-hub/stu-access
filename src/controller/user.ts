import logger from '../utils/logger';
import { createJWT } from '../utils';
import UserModel from '../models/user';
import { Request, Response } from 'express';
import { OBJECT_ID_REGEX } from '../constants';
import { validationErrors } from '../constants/errorMessages';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { AuthUserInput, CreateUserInput } from '../schema/user';
import { createUser, getUserByEmail, getUserById } from '../service/user';

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

export async function authHandler(
  req: Request<{}, {}, AuthUserInput['body']>,
  res: Response
) {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: validationErrors.noUser });
    }

    const didPasswordsMatch = UserModel.prototype.comparePassword(password);

    if (!didPasswordsMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: validationErrors.passwordsNoMatch });
    }

    // If password matches, assign and send the access token
    const payload = { _id: user._id, email };
    const accessToken = createJWT(payload);

    return res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    if (params === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const { id } = params;
    if (!id.match(OBJECT_ID_REGEX)) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const user = await getUserById(id);

    if (user === null) {
      return res.status(StatusCodes.NOT_FOUND).end();
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.CONFLICT).send(e.message);
  }
}
