import createStandardError from '../utils/createStandardError.js';
import createStandardResponse from '../utils/createStandardResponse.js';
import { StatusCodes } from 'http-status-codes';
import { MemberNotes } from '../models/memberNotes.model.js';

/**
 * @type {import('./ExpressController').ExpressHandler}
 */
const memberNotesController = {
  get: async function (req, res) {
    try {
      const membersNotes = await MemberNotes.find({ _member: req.params.memberId });

      const jsonResult = createStandardResponse(`Total finded notes ${membersNotes.length}`, membersNotes);

      res.status(StatusCodes.OK)
        .json(jsonResult);
    } catch (error) {
      createStandardError('Error fetching notes.');
    }
  },
  post: async function (req, res) {
    try {
      const memberNote = new MemberNotes(req.body);
      memberNote._member = req.params.memberId;

      await memberNote.save();

      res.status(StatusCodes.CREATED)
        .json(createStandardResponse('Note successfully created', memberNote));
    } catch (error) {
      console.log(error)
      createStandardError('Error creating Note.');
    }
  },
};

export default memberNotesController;