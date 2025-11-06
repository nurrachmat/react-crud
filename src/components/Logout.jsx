// src/components/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken"); // Menghapus token dari localStorage
    // Update App state so navbar reflects logged-out status immediately
    if (typeof setToken === "function") setToken(null);
    navigate("/login"); // Redirect ke halaman login setelah logout
  }, [navigate, setToken]);

  return null; // Tidak perlu menampilkan apa pun, hanya mengarahkan setelah logout
}
