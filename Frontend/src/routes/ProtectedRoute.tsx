import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { UserRole } from "../types/auth";

interface ProtectedRouteProps {
  // Kalau diisi, hanya role yang ada di list ini yang boleh akses.
  // Kalau kosong, cukup wajib login (role apa saja).
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    // Simpan lokasi asal supaya bisa dilempar balik setelah login (opsional)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Login tapi role tidak sesuai (mis. customer coba akses halaman admin)
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
