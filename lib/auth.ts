import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string) {
  return jwt.sign(
    {
      userId,
    },
    SECRET,
    {
      expiresIn: "7d",
    },
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
