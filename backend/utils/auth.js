import jwt from "jsonwebtoken"
import env from 'dotenv';

env.config();

const KEY = process.env.JWT_KEY;

export function createJSONToken(id, email) {
  return jwt.sign({userId: id, email: email}, KEY, { expiresIn: '1h' });
}