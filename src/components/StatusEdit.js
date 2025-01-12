import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const StatusEdit = () => {
    const [namaStatus, setNamaStatus] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/produk/api/status/${id}/`)
            .then(response => {
                const category = response.data;
                setNamaStatus(category.nama_status);
            })
            .catch(() => {
                setError('status tidak ditemukan.');
                setShowModal(true);

                setTimeout(() => {
                    navigate('/status');
                }, 3000);
            });
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        const data = { nama_status: namaStatus };

        axios.put(`http://localhost:8000/produk/api/status/${id}/`, data)
            .then(() => {
                toast.success('Berhasil mengedit status!');
                navigate('/status');
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setErrors({ general: 'Terjadi suatu kesalahan. Mohon coba lagi.' });
                }
                    toast.error('Gagal mengedit status.');
            });
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6">Edit status</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
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
                        <p className="mt-4 text-gray-700">status tidak ditemukan.</p>
                        <button
                            onClick={() => navigate('/status')}
                            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Kembali ke Daftar status
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatusEdit;
