import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: '#000127', width: '100%' }}
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5eZey95SOXB8Lv_jFMcSVObgv9ZpPaMqbA&s"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          Triü Raclette
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav mx-auto mb-2 mb-lg-0"
            style={{ textAlign: 'center' }}
          >
            <li className="nav-item">
              <Link to="/inicio" className="nav-link text-light">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/platillos" className="nav-link text-light">
                Platillos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pedidos" className="nav-link text-light">
                Pedidos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/roles" className="nav-link text-light">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className="nav-link text-light">
                Productos
              </Link>
            </li>
          </ul>

          <button
            className="btn btn-outline-warning"
            type="button"
            style={{ fontSize: '1rem' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
