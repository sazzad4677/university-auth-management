import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, `User does not exist`);
  }

  if (
    isUserExist?.password &&
    (await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, `Password is Incorrect`);
  }
  const { id: userID, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    {
      userID,
      role,
    },
    config.jwt.jwtSecret as Secret,
    config.jwt.jwtExpiresIn as string,
  );
  const refreshToken = jwtHelpers.createToken(
    {
      id: userID,
      role,
    },
    config.jwt.jwtRefreshSecret as Secret,
    config.jwt.jwtRefreshExpiresIn as string,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //  verify token
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(
      token,
      config.jwt.jwtRefreshSecret as Secret,
    );
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid Refresh Token');
  }

  // check if user exist
  const { userID } = verifyToken;
  const isUserExist = await User.isUserExist(userID);
  if (!isUserExist) throw new ApiError(StatusCodes.NOT_FOUND, 'User Not Found');
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.jwtSecret as Secret,
    config.jwt.jwtExpiresIn as string,
  );
  return { accessToken: newAccessToken };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isUserExist = await User.findOne({ id: user?.userID }).select(
    '+password',
  );

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(isUserExist.password, oldPassword))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Old Password is incorrect');
  }

  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
