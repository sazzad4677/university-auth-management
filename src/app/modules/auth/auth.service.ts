import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  const user = new User();
  const isUserExist = await user.isUserExists(id);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, `User does not exist`);
  }

  if (
    isUserExist?.password &&
    (await user.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, `Password is Incorrect`);
  }
};

export const AuthService = {
  loginUser,
};
