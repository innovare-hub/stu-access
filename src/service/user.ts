import bcrypt from 'bcrypt';
import { ReasonPhrases } from 'http-status-codes';
import UserModel, { UserInput } from '../models/user';
import { validationErrors } from '../constants/errorMessages';

interface UserDetails {
  _id: string;
  email: string;
  [key: string]: any;
}

export async function createUser(
  input: Omit<UserInput, 'createdAt' | 'updatedAt'>
) {
  try {
    const user = await UserModel.create(input);

    return user;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserById(id: string): Promise<UserDetails | null> {
  try {
    const user = await UserModel.findById(id).select('-password');

    if (!user) {
      throw new Error(validationErrors.noUser);
    }

    const userDetails: UserDetails = {
      ...user.toObject(),
      _id: user._id.toString(),
      email: user.email,
    };

    return userDetails;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserByEmail(
  email: string
): Promise<UserDetails | null> {
  try {
    const user = await UserModel.findOne({ email }).select('-password');

    if (!user) {
      throw new Error(validationErrors.noUser);
    }

    const userDetails: UserDetails = {
      ...user.toObject(),
      _id: user._id,
      email: user.email,
    };

    return userDetails;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePasswordAndGetUser(
  email: string,
  password: string
): Promise<UserDetails> {
  // Check if the user with the provided email exists
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error(ReasonPhrases.NOT_FOUND);
  }

  const userDetails: UserDetails = {
    ...user.toObject(),
    _id: user._id,
    email: user.email,
  };

  const isValid = await bcrypt
    .compare(password, user.password)
    .catch((e) => false);

  if (isValid) {
    delete userDetails.password;

    return userDetails;
  } else {
    throw new Error(ReasonPhrases.UNAUTHORIZED);
  }
}
