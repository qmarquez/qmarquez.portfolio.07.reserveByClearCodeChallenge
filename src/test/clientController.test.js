import { Client } from "../models/client.model";
import createJWT from "../utils/createJWT.js";
import { userRoles } from "../models/user.model.js";
import cookies from '../utils/cookies.js';
import { StatusCodes } from 'http-status-codes';

describe('· Client controller', () => {
  let token;
  beforeEach(() => {
    token = createJWT({ role: userRoles.salesAdmin }, 'sales admin');
  })

  it('Properly created client', async () => {
    jest.spyOn(Client.prototype, 'save')
      .mockImplementation(() => Promise.resolve(true));

    await supertestedApp.post('/client')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .send({
        companyName: 'Clear',
        address: 'a address',
        city: 'CABA',
        state: 'CABA',
        zip: '1676',
        headcount: 'a person',
      })
      .expect(StatusCodes.CREATED);
  });

  it('Properly updated client', async () => {
    const savedClient = {
      save: jest.fn(async () => { return true }),
      companyName: 'Clear',
      address: 'address',
      city: 'CABA',
      state: 'CABA',
      zip: '1676',
      headcount: 'person',
      isPublic: false
    };

    jest.spyOn(Client, 'findById')
      .mockImplementationOnce(() => Promise.resolve(savedClient));

    await supertestedApp.put('/client/123')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .send({
        companyName: 'Another Clear',
        address: 'Another address',
        city: 'Another CABA',
        state: 'Another CABA',
        zip: 'Another 1676',
        headcount: 'Another person',
        isPublic: true
      })
      .expect(StatusCodes.OK)
      .expect(
        (res) => {
          expect(res.body.payload.companyName).toBe('Another Clear');
          expect(res.body.payload.address).toBe('Another address');
          expect(res.body.payload.city).toBe('Another CABA');
          expect(res.body.payload.state).toBe('Another CABA');
          expect(res.body.payload.zip).toBe('Another 1676');
          expect(res.body.payload.headcount).toBe('Another person');
          expect(res.body.payload.isPublic).toBe(true);
        }
      );
  });

  it('Properly delete client', async () => {
    const savedClient = {
      companyName: 'Clear',
      address: 'address',
      city: 'CABA',
      state: 'CABA',
      zip: '1676',
      headcount: 'person',
      isPublic: false
    };

    jest.spyOn(Client, 'findByIdAndDelete')
      .mockImplementationOnce(() => Promise.resolve(savedClient));

    await supertestedApp.delete('/client/123')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .expect(StatusCodes.OK)
      .expect(
        (res) => {
          expect(res.body.payload.companyName).toBe('Clear');
          expect(res.body.payload.address).toBe('address');
          expect(res.body.payload.city).toBe('CABA');
          expect(res.body.payload.state).toBe('CABA');
          expect(res.body.payload.zip).toBe('1676');
          expect(res.body.payload.headcount).toBe('person');
          expect(res.body.payload.isPublic).toBe(false);
        }
      );
  });

  it('I can find by State', async () => {
    const savedClients = [{
      companyName: 'Clear',
      address: 'address',
      city: 'CABA',
      state: 'CABA',
      zip: '1676',
      headcount: 'person',
      isPublic: false
    }];

    jest.spyOn(Client, 'find')
      .mockImplementationOnce(
        (query) => {
          expect(query.state).toBe('qwerty');
          return Promise.resolve(savedClients);
        }
      );

    await supertestedApp.get('/client/findByField?field=state&value=qwerty')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .expect(StatusCodes.OK);
  });

  it('I can find by companyName', async () => {
    const savedClients = [{
      companyName: 'Clear',
      address: 'address',
      city: 'CABA',
      state: 'CABA',
      zip: '1676',
      headcount: 'person',
      isPublic: false
    }];

    jest.spyOn(Client, 'find')
      .mockImplementationOnce(
        (query) => {
          expect(query.companyName).toBeInstanceOf(RegExp);
          return Promise.resolve(savedClients);
        }
      );

    await supertestedApp.get('/client/findByField?field=companyName&value=qwerty')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .expect(StatusCodes.OK);
  });
  
  it('I receive an error if the field it\'s not allowed to find in', async () => {
    await supertestedApp.get('/client/findByField?field=anyField&value=qwerty')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .expect(StatusCodes.BAD_REQUEST);
  });
});