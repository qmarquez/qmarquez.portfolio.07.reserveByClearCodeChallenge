import { Member } from '../models/member.model.js';
import createStandardError from '../utils/createStandardError.js';
import createStandardResponse from '../utils/createStandardResponse.js';
import { StatusCodes } from 'http-status-codes';

/**
 * @type {import('./ExpressController').ExpressHandler}
 */
const memberController = {
  get: async function (req, res) {
    try {
      // This should be paginated for a production grade.
      const members = await Member.find().populate('_client');

      const jsonResult = createStandardResponse(`Total finded members ${members.length}`, members);

      res.status(StatusCodes.OK)
        .json(jsonResult);
    } catch (error) {
      createStandardError('Error fetching members.');
    }
  },
  post: async function (req, res) {
    try {
      const member = new Member(req.body);
      member._client = req.body.clientId;

      await member.save();

      res.status(StatusCodes.CREATED)
        .json(createStandardResponse('Member successfully created', member));
    } catch (error) {
      console.log(error)
      createStandardError('Error creating member.');
    }
  },
  put: async function (req, res) {
    try {
      const { body, params } = req;
      const member = await Member.findById(params.memberId);

      member.memberName = body.memberName;
      member.memberPhoneNumber = body.memberPhoneNumber;
      member.email = body.email;

      member.save();

      res.status(StatusCodes.OK)
        .json(createStandardResponse('Member successfully updated', member));
    } catch (error) {
      console.log(error);
      createStandardError('Error updating member.');
    }
  },
  patch: async function (req, res) {
    try {
      const { body, params } = req;
      const member = await Member.findById(params.memberId);

      member._client = body.newClientId;

      member.save();

      res.status(StatusCodes.OK)
        .json(createStandardResponse('Member successfully patched', member));
    } catch (error) {
      console.log(error);
      createStandardError('Error updating member.');
    }
  },
  delete: async function (req, res) {
    try {
      const deletedMember = await Member.findByIdAndDelete(req.params.memberId);

      res.status(StatusCodes.OK)
        .json(createStandardResponse('Member successfully deleted', deletedMember));
    } catch (error) {
      createStandardError('Error deleting member.');
    }
  }
};

export default memberController;