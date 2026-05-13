// components/AdminDashboard.jsx
'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { prisma } from '@/lib/prisma';

export default function AdminDashboard() {
  const [buku, setBuku] = useState([]);
  const [peminjaman, setPeminjaman] = useState([]);
  const [newBuku, setNewBuku] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [bukuRes, peminjamanRes] = await Promise.all([
      fetch('/api/buku'),
      fetch('/api/peminjaman')
    ]);
    
    const bukuData = await bukuRes.json();
    const peminjamanData = await peminjamanRes.json();
    
    setBuku(bukuData);
    setPeminjaman(peminjamanData);
  };

  const handleAddBuku = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/buku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBuku)
      });
      toast.success('Buku berhasil ditambahkan!');
      setNewBuku({});
      fetchData();
    } catch (error) {
      toast.error('Error menambah buku');
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800">Total Buku</h3>
          <p className="text-4xl font-bold text-blue-600">{buku.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800">Peminjaman Aktif</h3>
          <p className="text-4xl font-bold text-green-600">{peminjaman.filter(p => p.status === 'AKTIF').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800">Pengunjung</h3>
          <p className="text-4xl font-bold text-purple-600">{stats.pengunjung || 0}</p>
        </div>
      </div>

      {/* Form Input Buku */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Tambah Buku Baru</h2>
        <form onSubmit={handleAddBuku} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Judul Buku"
            className="input-field"
            value={newBuku.judul || ''}
            onChange={(e) => setNewBuku({...newBuku, judul: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Penulis"
            className="input-field"
            value={newBuku.penulis || ''}
            onChange={(e) => setNewBuku({...newBuku, penulis: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Penerbit"
            className="input-field"
            value={newBuku.penerbit || ''}
            onChange={(e) => setNewBuku({...newBuku, penerbit: e.target.value})}
          />
          <input
            type="number"
            placeholder="Tahun Terbit"
            className="input-field"
            value={newBuku.tahunTerbit || ''}
            onChange={(e) => setNewBuku({...newBuku, tahunTerbit: parseInt(e.target.value)})}
          />
          <input
            type="text"
            placeholder="ISBN"
            className="input-field"
            value={newBuku.isbn || ''}
            onChange={(e) => setNewBuku({...newBuku, isbn: e.target.value})}
          />
          <input
            type="number"
            placeholder="Stok"
            className="input-field"
            value={newBuku.stok || ''}
            onChange={(e) => setNewBuku({...newBuku, stok: parseInt(e.target.value)})}
            required
          />
          <select
            className="input-field"
            value={newBuku.kategori || ''}
            onChange={(e) => setNewBuku({...newBuku, kategori: e.target.value})}
          >
            <option value="">Pilih Kategori</option>
            <option value="Sains">Sains</option>
            <option value="Sejarah">Sejarah</option>
            <option value="Agama">Agama</option>
            <option value="Bahasa">Bahasa</option>
            <option value="Komik">Komik</option>
          </select>
          <textarea
            placeholder="Deskripsi"
            className="input-field col-span-2"
            rows="3"
            value={newBuku.deskripsi || ''}
            onChange={(e) => setNewBuku({...newBuku, deskripsi: e.target.value})}
          />
          <button type="submit" className="btn-primary col-span-2">
            Tambah Buku
          </button>
        </form>
      </div>

      {/* Daftar Buku */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 className="text-2xl font-bold text-white">Daftar Buku</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left">Judul</th>
                <th className="px-6 py-4 text-left">Penulis</th>
                <th className="px-6 py-4 text-left">Stok</th>
                <th className="px-6 py-4 text-left">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {buku.map((buku) => (
                <tr key={buku.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{buku.judul}</td>
                  <td className="px-6 py-4">{buku.penulis}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      buku.stok > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {buku.stok}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {buku.kategori}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
