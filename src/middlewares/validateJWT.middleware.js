import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import cookies from '../utils/cookies.js';
import createStandardError from '../utils/createStandardError.js';

export default function validateJWTMiddleware(req, res, next) {
  try {
    const token = req.cookies[cookies.jwtCookie];
    if (!token) {
      createStandardError('Missing JWT', StatusCodes.UNAUTHORIZED);
    }
    const decodedToken = jwt.verify(token, process.env.PUBLIC_KEY);
    req.user = decodedToken.user;
    req.user.username = decodedToken.sub;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return createStandardError('Authorization error', StatusCodes.UNAUTHORIZED);
    }
    createStandardError();
  }
};