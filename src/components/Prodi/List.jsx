/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function List() {
  const [prodi, setProdi] = useState([]);

  // Mengambil data prodi saat komponen dimount
  useEffect(() => {
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
      .then((response) => {
        setProdi(response.data.result); // Simpan data prodi ke dalam state
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error
      });
  }, []);

  // Fungsi untuk menghapus prodi berdasarkan ID dengan konfirmasi SweetAlert2
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Prodi: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
          .then((response) => {
            // Hapus prodi dari state setelah sukses dihapus dari server
            setProdi(prodi.filter((p) => p.id !== id));

            // Tampilkan notifikasi sukses
            Swal.fire("Deleted!", `Prodi ${nama} has been deleted.`, "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Menangani error
            Swal.fire("Error", `There was an issue deleting ${nama}.`, "error");
          });
      }
    });
  };

  return (
    <>
      <h2>List Prodi</h2>
      <NavLink to="/prodi/create" className="btn btn-primary mb-3">
        Create
      </NavLink>
      <table className="table">
        <thead>
          <tr>
            <th>Nama Prodi</th>
            <th>Nama Fakultas</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {prodi.map((p) => (
            <tr key={p.id}>
              <td>{p.nama} </td> {/* Menampilkan nama prodi */}
              <td>{p.fakultas.nama} </td> {/* Menampilkan nama fakultas */}
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Action buttons"
                >
                  <NavLink
                    to={`/prodi/edit/${p.id}`}
                    className="btn btn-warning"
                  >
                    Edit
                  </NavLink>
                  <button
                    onClick={() => handleDelete(p.id, p.nama)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
