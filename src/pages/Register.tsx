import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    username: z.string().min(2, "Username wajib diisi"),
    email: z.string().trim().toLowerCase().email("Email tidak valid"),
    password: z.string().min(6, "Minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorRegister, setErrorRegister] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorRegister("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userToSave = {
        username: data.username,
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
      };

      localStorage.setItem("registeredUser", JSON.stringify(userToSave));

      console.log("Data berhasil disimpan ke local storage:", userToSave);

      navigate("/login");

    } catch (err: any) {
      setErrorRegister("Register gagal, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md border-t-4 border-[#7B1D3F]">
        
        <h1 className="text-2xl font-bold text-center text-[#7B1D3F] mb-6">
          Daftar Akun INVOFEST
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          {/* Username */}
          <div>
            <input
              {...register("username")}
              placeholder="Username"
              className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-[#7B1D3F] ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-[#7B1D3F] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-[#7B1D3F] ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Konfirmasi Password */}
          <div>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Konfirmasi Password"
              className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-[#7B1D3F] ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Error umum */}
          {errorRegister && (
            <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded border border-red-200">
              {errorRegister}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#7B1D3F] text-white py-2.5 rounded font-bold hover:bg-[#5a152e] transition-all disabled:bg-gray-400 mt-2"
          >
            {loading ? "Membuat Akun..." : "Daftar Sekarang"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Sudah punya akun?{" "}
          <Link to="/login" className="underline text-[#7B1D3F] font-semibold hover:text-[#5a152e]">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}