/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function List() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State untuk mengontrol loading

  // Mengambil data mahasiswa saat komponen dimount
  useEffect(() => {
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/mahasiswa")
      .then((response) => {
        setMahasiswa(response.data.result); // Simpan data mahasiswa ke dalam state
        setIsLoading(false); // Set isLoading menjadi false setelah data berhasil diambil
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error
        setIsLoading(false); // Set isLoading menjadi false meskipun terjadi error
      });
  }, []);

  // Fungsi untuk menghapus mahasiswa berdasarkan ID dengan konfirmasi SweetAlert2
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Mahasiswa: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(`https://project-apiif-3-b.vercel.app/api/api/mahasiswa/${id}`)
          .then((response) => {
            // Hapus mahasiswa dari state setelah sukses dihapus dari server
            setMahasiswa(mahasiswa.filter((m) => m.id !== id));
            // Tampilkan notifikasi sukses
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Menangani error
            Swal.fire(
              "Error",
              "There was an issue deleting the data.",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      <h2>List Mahasiswa</h2>

      <NavLink to="/mahasiswa/create" className="btn btn-primary mb-3">
        Create
      </NavLink>

      {/* Tampilkan loader jika data belum selesai dimuat */}
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>NPM</th>
                <th>Nama</th>
                <th>Tanggal Lahir</th>
                <th>Tempat Lahir</th>
                <th>Alamat</th>
                <th>Prodi</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mahasiswa.map((m) => (
                <tr key={m.id}>
                  <td>{m.npm}</td>
                  <td>{m.nama}</td>
                  <td>{m.tanggal_lahir}</td>
                  <td>{m.tempat_lahir}</td>
                  <td>{m.alamat}</td>
                  <td>{m.prodi ? m.prodi.nama : '-'}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Action buttons"
                    >
                      <NavLink
                        to={`/mahasiswa/edit/${m.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => handleDelete(m.id, m.nama)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
