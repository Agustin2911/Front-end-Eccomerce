import { useState } from "react";
import { Navbar, NavLink } from "reactstrap";
import MenuBar from "./MenuBar";
import { FaSearch, FaShoppingCart, FaApple } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function MainNavbar({ opacity, cart }) {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el toggle menu

  const iphone_16 = [
    { name: "ver todos", url: "/gallery/iphone_16" },
    { name: "16", url: "/product/iphone_16/new" },
    { name: "16 plus", url: "/product/iphone_16_plus/new" },
    { name: "16 pro", url: "/product/iphone_16_pro/new" },
    { name: "16 pro max", url: "/product/iphone_16_pro_max/new" },
  ];

  const iphone_15 = [
    { name: "ver todos", url: "/gallery/iphone_15" },
    { name: "15", url: "/product/iphone_15/new" },
    { name: "15 plus", url: "/product/iphone_15_plus/new" },
    { name: "15 pro", url: "/product/iphone_15_pro/new" },
    { name: "15 pro max", url: "/product/iphone_15_pro_max/new" },
  ];

  const iphone_14 = [
    { name: "ver todos", url: "/gallery/iphone_14" },
    { name: "14", url: "/product/iphone_14/new" },
    { name: "14 plus", url: "/product/iphone_14_plus/new" },
    { name: "14 pro", url: "/product/iphone_14_pro/new" },
    { name: "14 pro max", url: "/product/iphone_14_pro_max/new" },
  ];

  const iphone_13 = [
    { name: "ver todos", url: "/gallery/iphone_13" },
    { name: "13", url: "/product/iphone_13/new" },
    { name: "13 mini", url: "/product/iphone_13_mini/new" },
    { name: "13 pro", url: "/product/iphone_13_pro/new" },
    { name: "13 pro max", url: "/product/iphone_13_pro_max/new" },
  ];

  const iphone_12 = [
    { name: "ver todos", url: "/gallery/iphone_12" },
    { name: "12", url: "/product/iphone_12/new" },
    { name: "12 mini", url: "/product/iphone_12_mini/new" },
    { name: "12 pro", url: "/product/iphone_12_pro/new" },
    { name: "12 pro max", url: "/product/iphone_12_pro_max/new" },
  ];

  const usados = [
    { name: "ver todos", url: "/used_phones" },
    { name: "16", url: "" },
    { name: "15", url: "" },
    { name: "14", url: "" },
    { name: "13", url: "" },
    { name: "12", url: "" },
    { name: "11", url: "" },
    { name: "xr", url: "" },
    { name: "x", url: "" },
  ];

  // Alternar visibilidad del menú
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Navbar
      className="text-white d-flex align-items-center fixed-top justify-content-between px-3"
      style={{
        height: "45px",
        width: "100%",
        background: "#333333",
        position: opacity ? "fixed" : "relative",
        opacity: opacity ? 0.7 : 0.9,
      }}
    >
      {/* Logo de Apple alineado a la izquierda */}
      <div className="d-flex align-items-center">
        <Link to="/mispedidos">
          <FaApple
            className="text-white"
            size={20}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>

      {/* Menú de navegación centrado en pantallas grandes */}
      <div
        className="d-none d-md-flex justify-content-center flex-grow-1"
        style={{ marginLeft: "20px" }}
      >
        <MenuBar objeto={"iphone"} numero={16} lista={iphone_16} />
        <MenuBar objeto={"iphone"} numero={15} lista={iphone_15} />
        <MenuBar objeto={"iphone"} numero={14} lista={iphone_14} />
        <MenuBar objeto={"iphone"} numero={13} lista={iphone_13} />
        <MenuBar objeto={"iphone"} numero={12} lista={iphone_12} />
        <MenuBar objeto={"iphone usados"} lista={usados} />
      </div>

      {/* Contenedor de iconos y botón del menú */}
      <div className="d-flex align-items-center gap-3">
        {/* Botón de menú para móviles */}
        <button
          className="btn btn-outline-light d-md-none "
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{ height: "30px", fontSize: "4mm" }}
        >
          {isOpen ? "Cerrar" : "Menú"}
        </button>

        {/* Íconos de búsqueda y carrito a la derecha */}
        <FaSearch
          className="text-white"
          style={{ cursor: "pointer" }}
          size={20}
        />
        <Link to="/Cart" className="position-relative">
          <FaShoppingCart
            size={20}
            className="text-white"
            style={{ cursor: "pointer" }}
          />
          {cart.length > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.6rem", padding: "0.2em 0.4em" }}
            >
              {cart.length}
            </span>
          )}
        </Link>
        <Link to="/signup" style={{ color: "white" }}>
          <FaUser size={20} />
        </Link>
      </div>

      {/* Menú desplegable en móviles (no ocupa toda la pantalla) */}
      {isOpen && (
        <div
          className="position-absolute top-100 start-0 w-100 text-white d-flex flex-column align-items-center p-3 shadow gap-3"
          style={{
            zIndex: 10,
            maxHeight: "400px", // Limita la altura del menú en móviles
            overflowY: "auto", // Agrega scroll si hay demasiados ítems
            background: "#333333 ",
          }}
        >
          <Link
            to="/gallery/iphone_16"
            style={{ textDecoration: "none", color: "white" }}
          >
            <NavLink>iPhone 16</NavLink>
          </Link>
          <Link
            to="/gallery/iphone_15"
            style={{ textDecoration: "none", color: "white" }}
          >
            <NavLink>iPhone 15</NavLink>
          </Link>
          <Link
            to="/gallery/iphone_14"
            style={{ textDecoration: "none", color: "white" }}
          >
            <NavLink>iPhone 14</NavLink>
          </Link>
          <Link
            to="/gallery/iphone_13"
            style={{ textDecoration: "none", color: "white" }}
          >
            <NavLink>iPhone 13</NavLink>
          </Link>
          <Link
            to="/gallery/iphone_12"
            style={{ textDecoration: "none", color: "white" }}
          >
            <NavLink>iPhone 12</NavLink>
          </Link>
          <Link
            to="/used_phones"
            style={{ textDecoration: "none", color: "white" }}
          >
            <NavLink>iPhone Usados</NavLink>
          </Link>
        </div>
      )}
    </Navbar>
  );
}

export default MainNavbar;
