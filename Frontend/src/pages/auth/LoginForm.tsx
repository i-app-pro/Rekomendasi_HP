import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { InputText } from "../../components/ui/InputText";
import { InputPassword } from "../../components/ui/InputPassword";
import { Button } from "../../components/ui/Button";
import { useAuthStore } from "../../store/useAuthStore";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const user = await login({ email: data.email, password: data.password });
      
      if (user?.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch {
      // Pesan error sudah ditangani & disimpan di store
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <h2 className="text-3xl md:text-4xl font-black text-center text-black tracking-wide uppercase mb-6 md:mb-8">
        LOGIN
      </h2>

      <InputText
        label="Email"
        nama="email"
        placeholder="Masukkan email anda..."
        register={register}
        error={errors.email?.message}
      />

      <InputPassword
        label="Password"
        nama="password"
        placeholder="Masukkan password anda..."
        register={register}
        error={errors.password?.message}
      />

      {/* Pesan error dari backend */}
      {error && (
        <p className="text-red-600 text-xs md:text-sm font-semibold mb-4 -mt-2 text-center">
          {error}
        </p>
      )}

      <p className="text-[11px] md:text-xs font-semibold text-gray-500 mt-1 mb-6 md:mb-8 select-none">
        Belum punya akun?{" "}
        <span 
          onClick={() => navigate("/register")} 
          className="text-black font-bold underline hover:text-[#e53935] cursor-pointer"
        >
          Registrasi disini
        </span>
      </p>

      <div className="w-full flex justify-center">
        <Button 
          type="submit" 
          label={isLoading ? "MEMPROSES..." : "LOGIN"}
          variant="primary" 
          disabled={isLoading}
          className="w-full"
        />
      </div>
    </form>
  );
}