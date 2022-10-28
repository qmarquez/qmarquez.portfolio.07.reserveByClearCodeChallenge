import { Client } from '../models/client.model.js';
import createStandardError from '../utils/createStandardError.js';
import createStandardResponse from '../utils/createStandardResponse.js';
import { StatusCodes } from 'http-status-codes';

/**
 * @type {import('./ExpressController').ExpressHandler}
 */
const clientController = {
  get: async function (req, res) {
    try {
      const { field, value } = req.query;
      const searchStrategy = searchStrategies[field];

      if (!searchStrategy) {
        createStandardError('Invalid field to find in.', StatusCodes.BAD_REQUEST);
      }

      const results = await searchStrategy(value);
      const jsonResult = createStandardResponse(`Total finded clients ${results.length}`, results);

      res.status(StatusCodes.OK)
        .json(jsonResult);
    } catch (error) {
      if (error.info) {
        throw error;
      }
      createStandardError('Error fetching clients.');
    }
  },
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

const searchStrategies = {
  state: (state) => {
    return Client.find({ state });
  },
  companyName: (companyName) => {
    // There is a dependency for fuzzy search, but it's not compatible with mongoose ^6
    // This fuzzy search it's an approach and I'm pretty sure it's not so performant.
    const fuzzyWords = [];
    for (const word of companyName.split(' ')) {
      if (word.length > 2) {
        for (let length = 2; length < word.length; length++) {
          for (let start = 0; length + start <= word.length; start++) {
            fuzzyWords.push(word.substring(start, length + start));
          }
        }
      } else {
        fuzzyWords.push(word);
      }
    }

    const rx = new RegExp(fuzzyWords.join('|'), 'i');

    return Client.find({ companyName: rx });
  }
}

export default clientController;