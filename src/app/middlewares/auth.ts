import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { ApiError } from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelper';

const auth =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get Token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You Are not Authorized');
      }
      //   Verify Token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwtSecret as Secret,
      );

      req.user = verifiedUser;

      //   Role Based Permission Checking
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(
          StatusCodes.FORBIDDEN,
          'You Are Not Allowed to Access this!',
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
