'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    setUser(decoded);
    setLoading(false);
  }, [router]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return <AdminDashboard />;
}
