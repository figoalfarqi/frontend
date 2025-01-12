import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <ul className="flex justify-center space-x-6">
                <li>
                    <Link to="/produk" className="text-white text-lg hover:text-gray-300">Produk</Link>
                </li>
                <li>
                    <Link to="/kategori" className="text-white text-lg hover:text-gray-300">Kategori</Link>
                </li>
                <li>
                    <Link to="/status" className="text-white text-lg hover:text-gray-300">Status</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
