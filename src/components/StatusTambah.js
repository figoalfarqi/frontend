import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StatusTambah = () => {
    const [namaStatus, setNamaStatus] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const data = { nama_status: namaStatus };

        axios.post('http://localhost:8000/produk/api/status/', data)
            .then(() => {
                toast.success('Berhasil menambahkan status!');
                navigate('/status');
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setErrors({ general: 'Terjadi suatu kesalahan. Mohon coba lagi.' });
                }
                toast.error('Gagal menambahkan status.');
            });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6">Tambah Status</h2>
            <button 
                onClick={() => navigate('/status')} 
                className="bg-gray-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-gray-600"
            >
                Kembali
            </button>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nama_status" className="block text-sm font-medium text-gray-700">Nama Status</label>
                    <input
                        type="text"
                        id="nama_status"
                        value={namaStatus}
                        onChange={(e) => setNamaStatus(e.target.value)}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.nama_status && (
                        <div className="mt-2 text-sm text-red-600">{errors.nama_status[0]}</div>
                    )}
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none">
                    Save
                </button>

                {errors.general && (
                    <div className="mt-4 text-sm text-red-600">{errors.general}</div>
                )}
            </form>
        </div>
    );
};

export default StatusTambah;
