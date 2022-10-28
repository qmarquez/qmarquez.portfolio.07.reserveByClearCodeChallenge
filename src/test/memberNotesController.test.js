import { MemberNotes } from "../models/memberNotes.model.js";
import createJWT from "../utils/createJWT.js";
import { userRoles } from "../models/user.model.js";
import cookies from '../utils/cookies.js';
import { StatusCodes } from 'http-status-codes';

describe.only('· Member notes controller', () => {
  let token;
  beforeEach(() => {
    token = createJWT({ role: userRoles.salesAdmin }, 'sales admin');
  })

  it('Properly created member note', async () => {
    jest.spyOn(MemberNotes.prototype, 'save')
      .mockImplementation(() => Promise.resolve(true));

    await supertestedApp.post('/member/notes/aMemberId')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .send({
        note: 'this is a note'
      })
      .expect(StatusCodes.CREATED)
      .expect((res) => {
        expect(res.body.payload.note).toBe('this is a note');
      });
  });

  it('I can get all notes for a member', async () => {
    const savedMemberNotes = [{
      _member: '635b15ee345939b9da3025d0',
      note: 'a note',
    }, {
      _member: '635b15ee345939b9da3025d0',
      note: 'another note',
    }];


    jest.spyOn(MemberNotes, 'find')
      .mockImplementationOnce((query) => {
        expect(query._member).toBe('aMemberId');
        return savedMemberNotes;
      });

    await supertestedApp.get('/member/notes/aMemberId')
      .set('Cookie', [`${cookies.jwtCookie}=${token}`])
      .expect(StatusCodes.OK)
      .expect(
        (res) => {
          expect(res.body.payload.length).toBe(2);
        }
      );
  });
});