import { Request, Response } from 'express';
import config from '../../../config';
import { catchAsync } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', result?.refreshToken, cookieOptions);
  if ('refreshToken' in result) delete result.refreshToken;
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    data: result,
    success: true,
    message: 'Logged In Success',
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', result?.accessToken, cookieOptions);
  if ('refreshToken' in result) delete result.refreshToken;
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    data: result,
    success: true,
    message: 'Logged In Success',
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;

  await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully !',
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
