import dotenv from 'dotenv';

export const MIN_PASSWORD_LENGTH = 8;
export const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

dotenv.config();

// Environment variables
export const JWT_SECRET = process.env.JWT_SECRET as string;
