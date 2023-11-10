import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { JWT_SECRET } from '../constants';

export function getRandomObjectID(): string {
  return new mongoose.Types.ObjectId().toString();
}

type DynamicObject = {
  [key: string]: any;
};

export function createJWT(payload: DynamicObject): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function isEmpty(string: string) {
  if (string === '' || string === undefined || string === null) {
    return true;
  }

  return false;
}

export function isString(string: string) {
  return typeof string === 'string';
}
