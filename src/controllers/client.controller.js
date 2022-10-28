import { Client } from '../models/client.model.js';
import createStandardError from '../utils/createStandardError.js';
import createStandardResponse from '../utils/createStandardResponse.js';
import { StatusCodes } from 'http-status-codes';

/**
 * @type {import('./ExpressController').ExpressHandler}
 */
const clientController = {
  post: async function (req, res) {
    try {
      const { body } = req;
      const client = new Client(body);

      await client.save();

      res.status(StatusCodes.CREATED)
        .json(createStandardResponse('Client successfully created', client));
    } catch (error) {
      createStandardError('Error creating client.');
    }
  },
  put: async function (req, res) {
    try {
      const { body, params } = req;
      const client = await Client.findById(params.clientId);

      client.companyName = body.companyName;
      client.address = body.address;
      client.city = body.city;
      client.state = body.state;
      client.zip = body.zip;
      client.headcount = body.headcount;
      client.isPublic = body.isPublic;

      await client.save();
      res.status(StatusCodes.OK)
        .json(createStandardResponse('Client successfully updated', client));
    } catch (error) {
      console.log(error);
      createStandardError('Error updating client.');
    }
  },
  delete: async function (req, res) {
    try {
      const { params } = req;
      const deletedClient = await Client.findByIdAndDelete(params.clientId);

      res.status(StatusCodes.OK)
        .json(createStandardResponse('Client successfully deleted', deletedClient));
    } catch (error) {
      createStandardError('Error deleting client.');
    }
  }
};

export default clientController;