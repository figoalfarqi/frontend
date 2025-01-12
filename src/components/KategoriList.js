import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const KategoriList = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/produk/api/kategori/')
            .then(response => setCategories(response.data));
    }, []);

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/produk/api/kategori/${deleteId}/`)
            .then(() => {
                setCategories(categories.filter(category => category.id !== deleteId));
                setShowModal(false);
                setDeleteId(null);
            });
    };

    const openModal = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setDeleteId(null);
    };
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6">Daftar Kategori</h2>
            <Link 
                to="/kategori-tambah" 
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-700"
            >
                Tambah Kategori
            </Link>
            
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Nama Kategori</th>
                        <th className="px-6 py-3 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-4">{category.nama_kategori}</td>
                            <td className="px-6 py-4">
                                <Link to={`/kategori-edit/${category.id}`} className="text-blue-600 hover:underline mr-4">
                                    Edit
                                </Link> 
                                <button
                                    onClick={() => openModal(category.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-red-600">Konfirmasi Hapus</h3>
                        <p className="mt-4 text-gray-700">Apakah Anda yakin ingin menghapus status ini?</p>
                        <div className="mt-6 flex justify-center space-x-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                            >
                                Hapus
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KategoriList;
