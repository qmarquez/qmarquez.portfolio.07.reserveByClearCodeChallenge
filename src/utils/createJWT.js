import jwt from 'jsonwebtoken';

export default function createJWT(user, subject) {
  return jwt.sign(
    { user },
    process.env.PRIVATE_KEY,
    {
      issuer: 'clear',
      subject,
      audience: 'https://clear.com',
      expiresIn: '24h',
      algorithm: 'RS256'
    }
  );
}