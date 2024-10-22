/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";  // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom";  // Mengimpor useParams dan useNavigate dari react-router-dom untuk menangani parameter dan navigasi
import axios from "axios";  // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams();  // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate();  // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [nama, setNama] = useState("");  // Menginisialisasi state 'nama' untuk menyimpan nama fakultas
  const [error, setError] = useState(null);  // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data fakultas berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)  // Mengirimkan request GET untuk mendapatkan data fakultas berdasarkan ID
      .then((response) => {
        setNama(response.data.result.nama);  // Jika sukses, mengisi state 'nama' dengan nama fakultas dari response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);  // Menampilkan pesan error di console jika request gagal
        setError("Data tidak ditemukan");  // Menampilkan pesan error jika data tidak ditemukan
      });
  }, [id]);  // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChange = (e) => {
    setNama(e.target.value);  // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  // Menghandle submit form untuk mengedit data fakultas
  const handleSubmit = (e) => {
    e.preventDefault();  // Mencegah reload halaman saat form disubmit
    axios
      .patch(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`, { nama })  // Mengirimkan request PATCH untuk mengupdate data fakultas berdasarkan ID
      .then((response) => {
        navigate("/fakultas");  // Jika update berhasil, navigasi kembali ke halaman list fakultas
      })
      .catch((error) => {
        console.error("Error updating data:", error);  // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data");  // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2>Edit Fakultas</h2>  {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}  {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>  {/* Form untuk mengedit nama fakultas */}
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">Nama Fakultas</label>  {/* Label untuk input nama */}
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama}  // Mengisi nilai input dengan state 'nama'
            onChange={handleChange}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>  {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}