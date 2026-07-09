import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Mengimpor komponen kustom
import { InputText } from "../../components/ui/InputText";
import { InputPassword } from "../../components/ui/InputPassword";
import { Button } from "../../components/ui/Button";

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(2, "Username atau Email tidak valid"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
});

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log("Simulasi Login Data:", data);
    
    // Alur bypass langsung sukses mengarahkan ke halaman dashboard
    alert("Login Berhasil!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      
      {/* Judul Form */}
      <h2 className="text-3xl md:text-4xl font-black text-center text-black tracking-wide uppercase mb-6 md:mb-8">
        LOGIN
      </h2>

      {/* Field Input Email */}
      <InputText
        label="Email"
        nama="username" // Diikat ke properti "nama" sesuai prop komponen InputText Anda
        placeholder="Masukkan email anda..."
        register={register}
        error={errors.username?.message}
      />

      {/* Field Input Password */}
      <InputPassword
        label="Password"
        nama="password" // Diikat ke properti "nama" sesuai prop komponen InputPassword Anda
        placeholder="Masukkan password anda..."
        register={register}
        error={errors.password?.message}
      />

      {/* Teks Navigasi ke Register */}
      <p className="text-[11px] md:text-xs font-semibold text-gray-500 mt-1 mb-6 md:mb-8 select-none">
        Belum punya akun?{" "}
        <span 
          onClick={() => navigate("/register")} 
          className="text-black font-bold underline hover:text-[#e53935] cursor-pointer"
        >
          Registrasi disini
        </span>
      </p>

      {/* Tombol Aksi Submit */}
      <div className="w-full flex justify-center">
        <Button 
          type="submit" 
          label="LOGIN" 
          variant="primary" 
          className="w-full" // w-full memastikan tombol melebar penuh di dalam card merah melengkung
        />
      </div>

    </form>
  );
}