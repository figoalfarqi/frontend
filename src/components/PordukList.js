import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProdukList = () => {
    const [products, setProducts] = useState([]);
    const [kategoriList, setKategoriList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [kategoriFilter, setKategoriFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        // Fetch Kategori and Status Lists
        axios.get('http://localhost:8000/produk/api/kategori/')
            .then(response => setKategoriList(response.data));

        axios.get('http://localhost:8000/produk/api/status/')
            .then(response => setStatusList(response.data));
    }, []);

    useEffect(() => {
        // Fetch filtered products
        const fetchProducts = () => {
            let url = 'http://localhost:8000/produk/api/produk/';
            if (kategoriFilter) {
                url += `?kategori=${kategoriFilter}`;
            }
            if (statusFilter) {
                url += `${kategoriFilter ? '&' : '?'}status=${statusFilter}`;
            }
            axios.get(url)
                .then(response =>{ 
                    setProducts(response.data.data)
                });
        };

        fetchProducts();
    }, [kategoriFilter, statusFilter]);

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/produk/api/produk/${deleteId}/`)
            .then(() => {
                setProducts(products.filter(product => product.id !== deleteId));
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
            <h2 className="text-2xl font-bold mb-6">Daftar Produk</h2>
            
            {/* Filter Dropdown */}
            <div className="flex space-x-4 mb-4">
                <div>
                    <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">Kategori</label>
                    <select
                        id="kategori"
                        value={kategoriFilter}
                        onChange={(e) => setKategoriFilter(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Semua Kategori</option>
                        {kategoriList.map((kategori) => (
                            <option key={kategori.id} value={kategori.id}>
                                {kategori.nama_kategori}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Semua Status</option>
                        {statusList.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.nama_status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <Link 
                to="/produk-tambah" 
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-700"
            >
                Tambah Produk
            </Link>
            
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Nama Produk</th>
                        <th className="px-6 py-3 text-left">Harga</th>
                        <th className="px-6 py-3 text-left">Kategori</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-4">{product.nama_produk}</td>
                            <td className="px-6 py-4">{product.harga}</td>
                            <td className="px-6 py-4">{product.kategori_detail?.nama_kategori || "Kategori tidak tersedia"}</td>
                            <td className="px-6 py-4">{product.status_detail?.nama_status || "Status tidak tersedia"}</td>

                            <td className="px-6 py-4">
                                <Link to={`/produk-edit/${product.id}`} className="text-blue-600 hover:underline mr-4">
                                    Edit
                                </Link> 
                                <button
                                    onClick={() => openModal(product.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Modal for Confirming Deletion */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-red-600">Konfirmasi Hapus</h3>
                        <p className="mt-4 text-gray-700">Apakah Anda yakin ingin menghapus produk ini?</p>
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

export default ProdukList;
