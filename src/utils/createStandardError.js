import createStandardResponse from './createStandardResponse.js';

export default function createStandardError(message = 'Something fail.', status = 500, payload = null) {
  throw {
    info: createStandardResponse(message, payload),
    status
  };
}