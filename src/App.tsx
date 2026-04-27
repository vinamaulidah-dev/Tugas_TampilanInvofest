import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Beranda from "./pages/Beranda";
import Seminar from "./pages/Seminar";
import Competition from "./pages/Competition";
import Login from "./pages/Login";
import Talkshow from "./pages/Talkshow";
import Workshop from "./pages/Workshop";
import Register from "./pages/Register";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 MAIN WEBSITE */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/talkshow" element={<Talkshow />} />

          {/* 👉 halaman setelah login */}
          <Route path="/dashboard" element={<Beranda />} />
        </Route>

        {/* 🔐 AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ❗ fallback kalau route tidak ada */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;