/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [nama, setNama] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [fakultas, setFakultas] = useState(""); // Menginisialisasi state 'fakultas' untuk menyimpan ID fakultas terpilih
  const [listFakultas, setListFakultas] = useState([]); // Menginisialisasi state 'listFakultas' untuk menyimpan daftar fakultas dari API
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data prodi berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data prodi berdasarkan ID
    axios
      .get(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
      .then((response) => {
        setNama(response.data.result.nama); // Menyimpan nama prodi ke dalam state 'nama'
        setFakultas(response.data.result.fakultas.id); // Menyimpan ID fakultas ke dalam state 'fakultas'
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

    // Mengambil data fakultas untuk dropdown
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/fakultas") // Request ke API fakultas
      .then((response) => {
        setListFakultas(response.data.result); // Menyimpan daftar fakultas ke dalam state 'listFakultas'
      })
      .catch((error) => {
        console.error("Error fetching fakultas data:", error); // Menangani error jika request gagal
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChange = (e) => {
    setNama(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  // Menghandle perubahan dropdown fakultas
  const handleFakultasChange = (e) => {
    setFakultas(e.target.value); // Mengubah state 'fakultas' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle submit form untuk mengedit data prodi
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .patch(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`, {
        nama,
        fakultas_id: fakultas,
      }) // Mengirimkan request PATCH untuk mengupdate data prodi berdasarkan ID
      .then((response) => {
        navigate("/prodi"); // Jika update berhasil, navigasi kembali ke halaman list prodi
      })
      .catch((error) => {
        console.error("Error updating data:", error); // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data"); // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2>Edit Program Studi</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}> {/* Form untuk mengedit nama prodi */}
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Program Studi
          </label> {/* Label untuk input nama prodi */}
          <input
            type="text" className="form-control" id="nama" value={nama} // Mengisi nilai input dengan state 'nama'
            onChange={handleChange} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fakultas" className="form-label">
            Nama Fakultas
          </label> {/* Label untuk dropdown fakultas */}
          <select
            className="form-select" id="fakultas" value={fakultas} // Mengisi nilai dropdown dengan state 'fakultas'
            onChange={handleFakultasChange} // Mengubah nilai dropdown saat pengguna memilih fakultas
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih Fakultas</option> {/* Default option untuk dropdown */}
            {listFakultas.map(
              // Melakukan mapping dari daftar fakultas untuk menampilkan setiap fakultas sebagai opsi
              (f) => (
                <option key={f.id} value={f.id}>
                  {f.nama} {/* Menampilkan nama fakultas */}
                </option>
              )
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>{" "}
        {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}
