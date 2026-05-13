import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'smp-mardi-waluya-secret-2024';

export async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Email atau password salah');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user };
}

export async function registerPengunjung(data) {
  const hashedPassword = bcrypt.hashSync(data.password, 10);
  
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      role: 'PENGUNJUNG'
    }
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getAuth(req) {
  const token = req.headers.authorization?.split(' ')[1];
  return token ? verifyToken(token) : null;
}
