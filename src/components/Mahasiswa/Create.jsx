/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Create() {
  const [npm, setNpm] = useState("");
  const [nama, setNama] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [prodiId, setProdiId] = useState("");
  const [prodiList, setProdiList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Mengambil data prodi untuk dropdown
  useEffect(() => {
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
      .then((response) => {
        setProdiList(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching prodi:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    // Validasi sederhana
    if (!npm || !nama || !tanggalLahir || !tempatLahir || !alamat || !prodiId) {
      setError("Semua field harus diisi!");
      return;
    }

    // Kirim data ke API
    axios
      .post("https://project-apiif-3-b.vercel.app/api/api/mahasiswa", {
        npm,
        nama,
        tanggal_lahir: tanggalLahir,
        tempat_lahir: tempatLahir,
        alamat,
        prodi_id: prodiId,
      })
      .then((response) => {
        // Tampilkan notifikasi sukses dengan SweetAlert2
        Swal.fire({
          title: "Success!",
          text: "Mahasiswa berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/mahasiswa"); // Redirect ke halaman list mahasiswa setelah sukses
        });
      })
      .catch((error) => {
        console.error("Error creating mahasiswa:", error);
        setError("Gagal menambahkan mahasiswa. Silakan coba lagi.");
      });
  };

  return (
    <div>
      <h2>Create Mahasiswa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="npm" className="form-label">
            NPM
          </label>
          <input
            type="text"
            className="form-control"
            id="npm"
            value={npm}
            onChange={(e) => setNpm(e.target.value)}
            placeholder="Masukkan NPM"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama
          </label>
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan Nama"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tanggalLahir" className="form-label">
            Tanggal Lahir
          </label>
          <input
            type="date"
            className="form-control"
            id="tanggalLahir"
            value={tanggalLahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tempatLahir" className="form-label">
            Tempat Lahir
          </label>
          <input
            type="text"
            className="form-control"
            id="tempatLahir"
            value={tempatLahir}
            onChange={(e) => setTempatLahir(e.target.value)}
            placeholder="Masukkan Tempat Lahir"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="alamat" className="form-label">
            Alamat
          </label>
          <textarea
            className="form-control"
            id="alamat"
            rows="3"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            placeholder="Masukkan Alamat"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="prodiId" className="form-label">
            Program Studi
          </label>
          <select
            className="form-select"
            id="prodiId"
            value={prodiId}
            onChange={(e) => setProdiId(e.target.value)}
          >
            <option value="">Pilih Program Studi</option>
            {prodiList.map((prodi) => (
              <option key={prodi.id} value={prodi.id}>
                {prodi.nama}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/mahasiswa")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
