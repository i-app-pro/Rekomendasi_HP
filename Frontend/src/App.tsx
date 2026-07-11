import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- IMPORT LAYOUTS ---
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout"; // Pastikan path foldernya sesuai

// --- IMPORT PAGES ---
// Main/Public Pages
import Beranda from "./pages/main/Beranda"; 
import HalamanProduk from "./pages/main/Produk"; 
import HalamanRekomendasi from "./pages/main/Rekomendasi"; 
import HalamanAboutUs from "./pages/main/Tentang";

// Auth Pages
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";

// Dashboard Pages
import DashboardHome from "./pages/dashboard/DashboardHome"; // Pastikan path foldernya sesuai
import UserPage from "./pages/dashboard/user/UserPage";
import BrandPage from "./pages/dashboard/brand/BrandPage";
import CriteriaValuePage from "./pages/dashboard/criteria_value/CriteriaValuePage";
import ProductPage from "./pages/dashboard/product/ProductPage";
import PembobotanPage from "./pages/dashboard/pembobotan/PembobotanPage";
import CriteriaPage from "./pages/dashboard/criteria/CriteriaPage";
import FounderPage from "./pages/dashboard/founder/FounderPage";
// import UserPage from "./pages/dashboard/UserPage"; // (Contoh untuk halaman lain nanti)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik Biasa */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/produk" element={<HalamanProduk />} />
          <Route path="/rekomendasi" element={<HalamanRekomendasi />} />
          <Route path="/tentang" element={<HalamanAboutUs />} />
        </Route>

        {/* Rute Auth (Menggunakan AuthLayout merah melengkung) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        {/* RUTE DASHBOARD ADMIN */}
        {/* Kita buat base path-nya "/dashboard" agar terpisah dari landing page */}
          <Route path="/dashboard" element={<DashboardLayout />}>
          {/* "index" berarti ini yang muncul saat user akses "/dashboard" */}
          <Route index element={<DashboardHome />} />
          <Route path= "/dashboard/user" element={<UserPage />} />
          <Route path= "/dashboard/brand" element={<BrandPage />} />
          <Route path= "/dashboard/criteria-value" element={<CriteriaValuePage />} />
          <Route path= "/dashboard/product" element={<ProductPage />} />
          <Route path= "/dashboard/pembobotan" element={<PembobotanPage />} />
          <Route path= "/dashboard/criteria" element={<CriteriaPage />} />
          <Route path= "/dashboard/founder" element={<FounderPage />} />
          {/* Nanti jika tabel User sudah dibuat filenya, tinggal buka komentar di bawah */}
          {/* <Route path="user" element={<UserPage />} /> */}
          {/* <Route path="brand" element={<BrandPage />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}