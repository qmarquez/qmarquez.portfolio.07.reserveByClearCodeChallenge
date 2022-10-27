import { StatusCodes } from 'http-status-codes/build/cjs/status-codes.js';
import { nodeEnvs } from '../utils/nodeEnvs.js';

/**
 * 
 * @param {*} error 
 * @param {Express.Request} _req 
 * @param {import('express').Response} res 
 * @param {*} _next 
 */
export default function errorHandlerMiddleware(error, _req, res, _next) {
  if (process.env.NODE_ENV == nodeEnvs.dev) {
    console.log('Error middleware: ', error);
  }

  const defaultErrorBody = {
    message: 'Something fail.'
  };

  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(error.info || defaultErrorBody);
};