// app/api/buku/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const buku = await prisma.buku.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(buku);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const buku = await prisma.buku.create({
      data
    });
    return NextResponse.json(buku, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error membuat buku' }, { status: 400 });
  }
}
