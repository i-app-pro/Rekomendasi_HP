import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Mengimpor komponen kustom
import { InputText } from "../../components/ui/InputText";
import { InputPassword } from "../../components/ui/InputPassword";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/useAuthStore";

type RegisterFormData = {
  nama: string;
  email: string;
  password: string;
};

// Skema validasi pendaftaran akun
const registerSchema = z.object({
  nama: z.string().min(3, "Nama lengkap harus minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Backend langsung mengembalikan token & login akun yang baru dibuat
      await registerUser(data);
      navigate("/login");
    } catch {
      // Pesan error sudah ditangani & disimpan di store (lihat `error` di bawah)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      
      {/* Judul Form Sesuai Gambar */}
      <h2 className="text-3xl md:text-4xl font-black text-center text-black tracking-wide uppercase mb-6 md:mb-8">
        REGISTER
      </h2>

      {/* Field Input Nama */}
      <InputText
        label="Nama"
        nama="nama"
        placeholder="Masukkan nama lengkap anda..."
        register={register}
        error={errors.nama?.message}
      />

      {/* Field Input Email */}
      <InputText
        label="Email"
        nama="email"
        placeholder="Masukkan email aktif anda..."
        register={register}
        error={errors.email?.message}
      />

      {/* Field Input Password */}
      <InputPassword
        label="Password"
        nama="password"
        placeholder="Buat password aman baru..."
        register={register}
        error={errors.password?.message}
      />

      {/* Pesan error dari backend (mis. email sudah terdaftar) */}
      {error && (
        <p className="text-red-600 text-xs md:text-sm font-semibold mb-4 -mt-2 text-center">
          {error}
        </p>
      )}

      {/* Teks Navigasi Kembali ke Login */}
      <p className="text-[11px] md:text-xs font-semibold text-gray-500 mt-1 mb-6 md:mb-8 select-none">
        Sudah memiliki akun?{" "}
        <span 
          onClick={() => navigate("/login")} 
          className="text-black font-bold underline hover:text-[#e53935] cursor-pointer"
        >
          Login disini
        </span>
      </p>

      {/* Tombol Registrasi Merah Tebal */}
      <div className="w-full flex justify-center">
        <Button 
          type="submit" 
          label={isLoading ? "MEMPROSES..." : "REGISTRASI"}
          variant="primary" 
          disabled={isLoading}
          className="w-full"
        />
      </div>

    </form>
  );
}
