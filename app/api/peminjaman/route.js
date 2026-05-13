// app/api/peminjaman/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const peminjaman = await prisma.peminjaman.findMany({
    include: {
      user: true,
      buku: true
    },
    orderBy: { tanggalPinjam: 'desc' }
  });
  return NextResponse.json(peminjaman);
}
