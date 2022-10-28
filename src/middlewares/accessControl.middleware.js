import { userRoles } from "../models/user.model.js";
import createStandardError from "../utils/createStandardError.js";
import { StatusCodes } from 'http-status-codes';

export default function accessControlMiddleware(req, res, next) {
  if (req.user.role !== userRoles.salesAdmin) {
    createStandardError('User not allowed.', StatusCodes.UNAUTHORIZED);
  }
  next();
}