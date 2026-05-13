'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function PengunjungPage() {
  const [buku, setBuku] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBuku();
  }, []);

  const fetchBuku = async () => {
    const res = await fetch('/api/buku');
    const data = await res.json();
    setBuku(data);
  };

  const filteredBuku = buku.filter(buku =>
    buku.judul.toLowerCase().includes(search.toLowerCase()) ||
    buku.penulis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Perpustakaan Digital
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          SMP Mardi Waluya 2 Kota Sukabumi
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Cari buku, penulis..."
            className="flex-1 input-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link href="/login" className="btn-primary">
            Login untuk Pinjam
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBuku.map((bukuItem) => (
            <div key={bukuItem.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">📚</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {bukuItem.judul}
                </h3>
                <p className="text-gray-600 mb-2">{bukuItem.penulis}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">{bukuItem.kategori}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    bukuItem.stok > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    Stok: {bukuItem.stok}
                  </span>
                </div>
                <Link 
                  href={`/buku/${bukuItem.id}`}
                  className="w-full btn-primary text-center"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
