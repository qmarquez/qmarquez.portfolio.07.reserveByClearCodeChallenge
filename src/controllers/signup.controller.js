import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';
import createStandardError from '../utils/createStandardError.js';
import createStandardResponse from '../utils/createStandardResponse.js';
import cookies from '../utils/cookies.js';
import { StatusCodes } from 'http-status-codes';
import createJWT from '../utils/createJWT.js';
import ages from '../utils/ages.js';

// ONLY FOR SINPLIFY CHALLENGE PURPOSES
// NOT PRODUCTION CODE

/**
 * @type {import('./ExpressController').ExpressHandler}
 */
const signupController = {
  post: async function (req, res) {
    try {
      const { body } = req;
      body.password = bcryptjs.hashSync(body.password);
      const user = new User(body);
      await user.save();

      const token = createJWT({ role: user.role }, user.username);
      const jsonResponse = createStandardResponse('User logged in', {
        username: user.username
      });

      res.cookie(cookies.jwtCookie, token, { maxAge: ages.oneDay_ms })
        .status(StatusCodes.CREATED)
        .json(jsonResponse);
    } catch (error) {
      createStandardError('Error performing signup');
    }
  }
};

export default signupController;