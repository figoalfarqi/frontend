import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProdukEdit = () => {
    const [namaProduk, setNamaProduk] = useState('');
    const [harga, setHarga] = useState('');
    const [kategori, setKategori] = useState('');
    const [status, setStatus] = useState('');
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/produk/api/produk/${id}/`)
            .then(response => {
                const produk = response.data;
                setNamaProduk(produk.nama_produk);
                setHarga(produk.harga);
                setKategori(produk.kategori_detail?.id);
                setStatus(produk.status_detail?.id);
            })
            .catch(() => {
                setError('Produk tidak ditemukan.');
                setShowModal(true);
                setTimeout(() => {
                    navigate('/produk');
                }, 3000);
            });

        axios.get('http://localhost:8000/produk/api/kategori/')
            .then(response => setCategories(response.data));

        axios.get('http://localhost:8000/produk/api/status/')
            .then(response => setStatuses(response.data));
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const data = { nama_produk: namaProduk, harga, kategori, status };

        axios.put(`http://localhost:8000/produk/api/produk/${id}/`, data)
            .then(() => {
                toast.success('Berhasil mengedit produk!');
                navigate('/produk');
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setErrors({ general: 'Terjadi suatu kesalahan. Mohon coba lagi.' });
                }
                toast.error('Gagal mengedit produk.');
            });
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6">Edit Produk</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <button
                onClick={() => navigate('/produk')}
                className="bg-gray-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-gray-600"
            >
                Kembali
            </button>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nama_produk" className="block text-sm font-medium text-gray-700">Nama Produk</label>
                    <input
                        type="text"
                        id="nama_produk"
                        value={namaProduk}
                        onChange={(e) => setNamaProduk(e.target.value)}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.nama_produk && (
                        <div className="mt-2 text-sm text-red-600">{errors.nama_produk[0]}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="harga" className="block text-sm font-medium text-gray-700">Harga</label>
                    <input
                        type="number"
                        id="harga"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.harga && (
                        <div className="mt-2 text-sm text-red-600">{errors.harga[0]}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">Kategori</label>
                    <select
                        id="kategori"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="">Pilih Kategori</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nama_kategori}</option>
                        ))}
                    </select>
                    {errors.kategori && (
                        <div className="mt-2 text-sm text-red-600">{errors.kategori[0]}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="">Pilih Status</option>
                        {statuses.map(stat => (
                            <option key={stat.id} value={stat.id}>{stat.nama_status}</option>
                        ))}
                    </select>
                    {errors.status && (
                        <div className="mt-2 text-sm text-red-600">{errors.status[0]}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Update
                </button>
                {errors.general && (
                    <div className="mt-4 text-sm text-red-600">{errors.general}</div>
                )}
            </form>
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-red-600">Error</h3>
                        <p className="mt-4 text-gray-700">Produk tidak ditemukan.</p>
                        <button
                            onClick={() => navigate('/produk')}
                            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Kembali ke Daftar Produk
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProdukEdit;
