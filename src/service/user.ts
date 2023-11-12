import UserModel, { UserInput } from '../models/user';
import { validationErrors } from '../constants/errorMessages';

interface UserDetails {
  _id: string;
  email: string;
  [key: string]: any;
}

export async function createUser(
  input: Omit<UserInput, 'createdAt' | 'updatedAt' | 'comparePassword'>
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
