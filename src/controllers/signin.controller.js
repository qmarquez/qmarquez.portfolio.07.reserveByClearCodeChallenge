import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';
import createStandardError from '../utils/createStandardError.js';
import createStandardResponse from '../utils/createStandardResponse.js';
import cookies from '../utils/cookies.js';
import createJWT from '../utils/createJWT.js';
import ages from '../utils/ages.js';
import { StatusCodes } from 'http-status-codes';

/**
 * @type {import('./ExpressController').ExpressHandler}
 */
const signinController = {
  post: async function (req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username }).select('+password');

      if (!user || !bcryptjs.compareSync(password, user.password)) {
        createStandardError('Error with provided credentials');
      }

      const token = createJWT({ role: user.role }, user.username);
      const jsonResponse = createStandardResponse('User logged in', {
        username: user.username
      });

      res.cookie(cookies.jwtCookie, token, { maxAge: ages.oneDay_ms })
        .status(StatusCodes.OK)
        .json(jsonResponse);
    } catch (error) {
      createStandardError('Error performing login');
    }
  }
};

export default signinController;