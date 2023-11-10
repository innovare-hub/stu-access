import UserModel, { UserInput } from '../models/user';

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
