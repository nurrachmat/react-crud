import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Loader from "./components/Loader"; // Loader Component
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute Component

// Lazy loading untuk komponen Home dan FakultasList
const Home = React.lazy(() => import("./components/Home"));
const FakultasList = React.lazy(() => import("./components/Fakultas/List"));
const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"));
const FakultasEdit = React.lazy(() => import("./components/Fakultas/Edit"));
const ProdiList = React.lazy(() => import("./components/Prodi/List"));
const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"));
const ProdiEdit = React.lazy(() => import("./components/Prodi/Edit"));
const Login = React.lazy(() => import("./components/Login"));

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Ambil token dari localStorage

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Hapus token dari localStorage
    setToken(null); // Update state token
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Home
          </NavLink>
          {/* Toggler Button for mobile devices */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/fakultas"
                >
                  Fakultas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/prodi"
                >
                  Program Studi
                </NavLink>
              </li>
              {token && ( // Tampilkan Logout jika token ada
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => {
                      handleLogout(); // Panggil handleLogout saat logout ditekan
                      window.location.href = "/login"; // Navigasi ke halaman login
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Suspense fallback={<Loader />}>
          {/* Suspense untuk fallback saat loading */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Route ke halaman Home */}
            <Route path="/login" element={<Login />} />
            {/* Route ke halaman Login */}
            {/* Protected routes */}
            <Route
              path="/fakultas"
              element={
                <ProtectedRoute>
                  <FakultasList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fakultas/create"
              element={
                <ProtectedRoute>
                  <FakultasCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fakultas/edit/:id"
              element={
                <ProtectedRoute>
                  <FakultasEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prodi"
              element={
                <ProtectedRoute>
                  <ProdiList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prodi/create"
              element={
                <ProtectedRoute>
                  <ProdiCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prodi/edit/:id"
              element={
                <ProtectedRoute>
                  <ProdiEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>

        <div>&copy; 2024 Mahasiswa</div>
      </div>
    </Router>
  );
};

export default App;
