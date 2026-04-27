import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().trim().email("Email tidak valid"),
  password: z.string().min(8, "Minimal 8 karakter"),
});

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorLogin("");

    try {
      const cleanEmail = data.email.trim().toLowerCase();
      const cleanPassword = data.password.trim();

      await new Promise((resolve) => setTimeout(resolve, 800));

      const storedUser = localStorage.getItem("registeredUser");
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);

        if (cleanEmail === userData.email && cleanPassword === userData.password) {
          localStorage.setItem("token", "dummy_token");
          localStorage.setItem("userEmail", cleanEmail);
          
          window.dispatchEvent(new Event("storage"));
          navigate("/", { replace: true });
        } else {
          throw new Error("Email atau password tidak sesuai dengan yang terdaftar");
        }
      } else {
        if (cleanEmail === "admin@gmail.com" && cleanPassword === "123456") {
          localStorage.setItem("token", "dummy_token");
          navigate("/", { replace: true });
        } else {
          throw new Error("Akun tidak ditemukan. Silakan daftar dulu.");
        }
      }

    } catch (err: any) {
      setErrorLogin(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-sm p-8 rounded-xl shadow-md border-t-4 border-[#7B1D3F]">
        <h1 className="text-2xl font-bold text-center text-[#7B1D3F] mb-6">
          Login INVOFEST
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          {errorLogin && (
            <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded border border-red-200">
              {errorLogin}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#7B1D3F] text-white py-2 rounded font-bold hover:bg-[#5a152e] transition-colors disabled:bg-gray-400"
          >
            {loading ? "Mengecek Akun..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#7B1D3F] underline font-semibold">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}