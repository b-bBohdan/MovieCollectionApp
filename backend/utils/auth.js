import JWT from "jsonwebtoken"
import env from 'dotenv';

env.config();

const KEY = process.env.JWT_KEY;

function createJSONToken(id, email) {
  return JWT.sign({userId: id, email: email}, KEY, { expiresIn: '1h' });
}