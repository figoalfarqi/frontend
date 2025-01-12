import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import ProdukList from "./components/PordukList";
import ProdukTambah from "./components/ProdukTambah";
import ProdukEdit from "./components/ProdukEdit";
import KategoriList from "./components/KategoriList";
import KategoriTambah from "./components/KategoriTambah";
import KategoriEdit from "./components/KategoriEdit";
import Navbar from "./components/Navbar";
import StatusList from "./components/StatusList";
import StatusTambah from "./components/StatusTambah";
import StatusEdit from "./components/StatusEdit";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/produk" element={<ProdukList />} />
          <Route path="/produk-tambah" element={<ProdukTambah />} />
          <Route path="/produk-edit/:id" element={<ProdukEdit />} />
          <Route path="/kategori" element={<KategoriList />} />
          <Route path="/kategori-tambah" element={<KategoriTambah />} />
          <Route path="/kategori-edit/:id" element={<KategoriEdit />} />
          <Route path="/status" element={<StatusList />} />
          <Route path="/status-tambah" element={<StatusTambah />} />
          <Route path="/status-edit/:id" element={<StatusEdit />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
