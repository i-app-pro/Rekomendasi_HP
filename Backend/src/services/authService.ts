import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../lib/db';
import { RegisterInput, LoginInput, AuthResult } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export class AuthError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const registerUser = async (input: RegisterInput) => {
  const { nama, email, password } = input;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AuthError(409, 'Email sudah terdaftar');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: { nama, email, password: hashedPassword },
    select: { id: true, nama: true, email: true, role: true },
  });

  return user;
};

export const loginUser = async (input: LoginInput): Promise<AuthResult> => {
  const { email, password } = input;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new AuthError(401, 'Email atau password salah');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AuthError(401, 'Email atau password salah');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
  );

  return {
    token,
    user: { id: user.id, nama: user.nama, email: user.email, role: user.role },
  };
};