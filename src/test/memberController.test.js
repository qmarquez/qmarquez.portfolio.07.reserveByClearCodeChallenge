import { Member } from "../models/member.model";
import createJWT from "../utils/createJWT.js";
import { userRoles } from "../models/user.model.js";
import cookies from '../utils/cookies.js';
import { StatusCodes } from 'http-status-codes';

describe('· Member controller', () => {
  let token;
  beforeEach(() => {
    token = createJWT({ role: userRoles.salesAdmin }, 'sales admin');
  })

  it('Properly created member', async () => {
    jest.spyOn(Member.prototype, 'save')
      .mockImplementation(() => Promise.resolve(true));

    await supertestedApp.post('/member')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .send({
        clientId: '635b15ee345939b9da3025d0',
        memberName: 'a Name',
        memberPhoneNumber: '+5411311111111',
        email: 'aMail@gmail.com'
      })
      .expect(StatusCodes.CREATED)
      .expect((res) => {
        expect(res.body.message).toBe('Member successfully created');
      });
  });

  it('Properly updated member', async () => {
    const savedClient = {
      save: jest.fn(async () => { return true }),
      _client: '635b15ee345939b9da3025d0',
      memberName: 'a Name',
      memberPhoneNumber: '+5411311111111',
      email: 'aMail@gmail.com'
    };

    jest.spyOn(Member, 'findById')
      .mockImplementationOnce(() => Promise.resolve(savedClient));

    await supertestedApp.put('/member/123')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .send({
        _client: 'senselesid',
        memberName: 'another Name',
        memberPhoneNumber: '+541132222222',
        email: 'anotherMail@gmail.com'
      })
      .expect(StatusCodes.OK)
      .expect(
        (res) => {
          expect(res.body.payload._client).toBe('635b15ee345939b9da3025d0');
          expect(res.body.payload.memberName).toBe('another Name');
          expect(res.body.payload.memberPhoneNumber).toBe('+541132222222');
          expect(res.body.payload.email).toBe('anotherMail@gmail.com');
        }
      );
  });

  it('Properly delete member', async () => {
    const savedClient = {
      save: jest.fn(async () => { return true }),
      _client: '635b15ee345939b9da3025d0',
      memberName: 'a Name',
      memberPhoneNumber: '+5411311111111',
      email: 'aMail@gmail.com'
    };

    jest.spyOn(Member, 'findByIdAndDelete')
      .mockImplementationOnce(() => Promise.resolve(savedClient));

    await supertestedApp.delete('/member/123')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .expect(StatusCodes.OK)
      .expect(
        (res) => {
          expect(res.body.payload._client).toBe('635b15ee345939b9da3025d0');
          expect(res.body.payload.memberName).toBe('a Name');
          expect(res.body.payload.memberPhoneNumber).toBe('+5411311111111');
          expect(res.body.payload.email).toBe('aMail@gmail.com');
        }
      );
  });

  it('I can get all members', async () => {
    const savedMembers = [{
      _client: '635b15ee345939b9da3025d0',
      memberName: 'a Name',
      memberPhoneNumber: '+5411311111111',
      email: 'aMail@gmail.com'
    }];


    jest.spyOn(Member, 'find')
      .mockImplementationOnce(() => ({ populate: jest.fn(async () => savedMembers) }));

    await supertestedApp.get('/member/all')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .expect(StatusCodes.OK)
      .expect(
        (res) => {
          expect(res.body.payload.length).toBe(1);
        }
      );
  });
});