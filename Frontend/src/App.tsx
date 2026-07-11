import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./pages/main/Beranda"; // File landing page kamu
import HalamanProduk from "./pages/main/Produk"; // Halaman katalog produk
import HalamanRekomendasi from "./pages/main/Rekomendasi"; 
import HalamanAboutUs from "./pages/main/Tentang";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik Biasa */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/produk" element={<HalamanProduk />} />
          <Route path="/tentang" element={<HalamanAboutUs />} />

          {/* Rekomendasi butuh login (endpoint /api/sessions & /api/recommendation
              mewajibkan Authorization: Bearer <token>) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/rekomendasi" element={<HalamanRekomendasi />} />
          </Route>
        </Route>

        {/* Rute Auth (Menggunakan AuthLayout merah melengkung yang kita buat) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}