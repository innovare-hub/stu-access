import dotenv from 'dotenv';

export const MIN_PASSWORD_LENGTH = 8;

dotenv.config();

// Environment variables
export const JWT_SECRET = process.env.JWT_SECRET as string;
