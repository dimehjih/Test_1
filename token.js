import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const key = process.env.KEY;
const Token = ({ id }) => jwt.sign(
  { id },
  key,
  { expiresIn: '2h' },
);
export default Token;