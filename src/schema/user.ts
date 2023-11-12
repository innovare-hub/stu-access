import { object, string, TypeOf } from 'zod';
import { MIN_PASSWORD_LENGTH } from '../constants';
import { validationErrors } from '../constants/errorMessages';

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: validationErrors.fieldIsRequired('email'),
    }).email(validationErrors.notValidEmail),
    password: string({
      required_error: validationErrors.fieldIsRequired('password'),
    }).min(MIN_PASSWORD_LENGTH),
    passwordConfirmation: string({
      required_error: validationErrors.fieldIsRequired('password confirmation'),
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: validationErrors.passwordsNoMatch,
    path: ['passwordConfirmation'],
  }),
});

export const authUserSchema = object({
  body: object({
    email: string({
      required_error: validationErrors.fieldIsRequired('email'),
    }).email(validationErrors.notValidEmail),
    password: string({
      required_error: validationErrors.fieldIsRequired('password'),
    }).min(MIN_PASSWORD_LENGTH),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;

export type AuthUserInput = TypeOf<typeof authUserSchema>;
