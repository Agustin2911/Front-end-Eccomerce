// src/components/MainNavbar.jsx
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const MENU_DATA = [
  {
    label: "PCs Armadas",
    sections: [
      {
        title: "Ver todas las PCs",
        links: [
          { name: "PC Gamer", url: "/gallery/placas_video/amd" },
          { name: "PC Oficina", url: "/gallery/placas_video/nvidia" },
          { name: "PC Workstation", url: "/gallery/placas_video/nvidia" },
        ],
      },
    ],
  },
  {
    label: "Hardware",
    sections: [
      {
        title: "Placas de Video",
        links: [
          { name: "AMD Radeon", url: "/gallery/placas_video/amd" },
          { name: "NVIDIA GeForce", url: "/gallery/placas_video/nvidia" },
        ],
      },
      {
        title: "Procesadores",
        links: [
          { name: "AMD", url: "/gallery/procesadores/amd" },
          { name: "Intel", url: "/gallery/procesadores/intel" },
        ],
      },
      {
        title: "Componentes",
        links: [
          { name: "Motherboards", url: "/gallery/componentes/motherboards" },
          { name: "Fuentes", url: "/gallery/componentes/fuentes" },
          { name: "Refrigeración", url: "/gallery/componentes/refrigeracion" },
          { name: "Gabinetes", url: "/gallery/componentes/gabinetes" },
          { name: "Conectividad y Redes", url: "/gallery/componentes/redes" },
        ],
      },
      {
        title: "Almacenamiento",
        links: [
          { name: "Discos SATA", url: "/gallery/almacenamiento/sata" },
          { name: "Discos Externos", url: "/gallery/almacenamiento/externos" },
          { name: "Discos SSD", url: "/gallery/almacenamiento/ssd" },
        ],
      },
      {
        title: "Memorias RAM",
        links: [
          { name: "DDR3", url: "/gallery/memorias/ddr3" },
          { name: "DDR4", url: "/gallery/memorias/ddr4" },
          { name: "DDR5", url: "/gallery/memorias/ddr5" },
          { name: "SODIMM DDR4", url: "/gallery/memorias/sodimm_ddr4" },
          { name: "SODIMM DDR5", url: "/gallery/memorias/sodimm_ddr5" },
        ],
      },
    ],
  },
  {
    label: "Periféricos",
    sections: [
      {
        title: "Teclados",
        links: [
          {
            name: "Teclados Inalámbricos",
            url: "/gallery/perifericos/tecladoinalambrico",
          },
          { name: "Teclados Gamer", url: "/gallery/perifericos/tecladogamer" },
          { name: "Teclados USB", url: "/gallery/perifericos/tecladousb" },
        ],
      },
      {
        title: "Mouses",
        links: [
          {
            name: "Mouses Inalámbricos",
            url: "/gallery/perifericos/mouseinalambrico",
          },
          { name: "Mouses Gamer", url: "/gallery/perifericos/mousegamer" },
          { name: "Mouses USB", url: "/gallery/perifericos/mouseusb" },
        ],
      },
      {
        title: "Auriculares",
        links: [
          {
            name: "Auriculares Inalámbricos",
            url: "/gallery/perifericos/auricularinalambrico",
          },
          { name: "Auriculares Gamer", url: "/gallery/perifericos/auriculargamer" },
          {
            name: "Auriculares con Micrófono",
            url: "/gallery/perifericos/auricularmicrofono",
          },
        ],
      },
      {
        title: "Accesorios",
        links: [
          { name: "Mousepads", url: "/gallery/perifericos/mousepads" },
          { name: "Joysticks", url: "/gallery/perifericos/joysticks" },
        ],
      },
      {
        title: "Streaming",
        links: [
          { name: "Webcams", url: "/gallery/perifericos/webcams" },
          { name: "Micrófonos", url: "/gallery/perifericos/microfonos" },
          {
            name: "Capturadoras de Video",
            url: "/gallery/perifericos/capturadoras",
          },
          { name: "Stream Decks", url: "/gallery/perifericos/streamdecks" },
        ],
      },
      {
        title: "Otros",
        links: [
          { name: "Pendrives", url: "/gallery/perifericos/pendrives" },
          { name: "Sillas Gamer", url: "/gallery/perifericos/sillas" },
          { name: "Impresoras", url: "/gallery/perifericos/impresoras" },
          { name: "Proyectores", url: "/gallery/perifericos/proyectores" },
        ],
      },
    ],
  },

  // ----------------------
  // CATEGORÍAS SIN DROPDOWN (solo link directo)
  // ----------------------

  {
    label: "Notebooks",
    url: "/gallery/notebooks",
  },
  {
    label: "Monitores",
    url: "/gallery/monitores",
  },
  {
    label: "Ver Todo",
    url: "/gallery",
  },
];

export default function MainNavbar({ cartCount = 0 }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 858);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 858;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
        setIsMobileSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchBarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    height: 80,
    backgroundColor: "rgba(0, 0, 0, 0.91)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    boxSizing: "border-box",
    zIndex: 1002,
    justifyContent: isMobile ? "space-between" : "space-between",
  };

  const logoStyle = {
    maxWidth: "100%",
    height: "auto",
    width: "160px",
    cursor: "pointer",
    flexShrink: 0,
    margin: isMobile ? "0 auto" : "0",
  };

  const searchInputContainer = {
    flex: "1",
    position: "relative",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 700,
    marginLeft: isMobile ? 0 : "-100px",
  };

  const searchInputStyle = {
    width: "100%",
    maxWidth: 500,
    height: 36,
    borderRadius: 4,
    border: "1px solid #555",
    padding: "0 12px",
    fontSize: 14,
    outline: "none",
    backgroundColor: "#111",
    color: "#F1E6F7",
  };

  const rightIconsContainer = {
    display: "flex",
    alignItems: "center",
    gap: 20,
  };

  const iconStyle = {
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    position: "relative",
  };

  const cartBadgeStyle = {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#e03e2d",
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 5px",
    borderRadius: 10,
    lineHeight: 1,
  };

  const menuBarStyle = {
    position: "fixed",
    top: 80,
    width: "100%",
    height: 60,
    backgroundColor: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    zIndex: 1001,
    display: isMobile ? "none" : "block",
  };

  const containerStyle = {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    height: "100%",
    boxSizing: "border-box",
  };

  const menuStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    gap: 24,
    flexWrap: "wrap",
  };

  const itemStyle = {
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    padding: "0 8px",
    lineHeight: "60px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  const dropdownContainerStyle = {
    position: "fixed",
    top: 130,
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: 1180,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
    borderRight: "1px solid rgba(255, 255, 255, 0.2)",
    zIndex: 1000,
    overflow: "hidden",
  };

  const dropdownInnerStyle = {
    maxWidth: 1180,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 30,
    padding: "20px",
    boxSizing: "border-box",
  };

  const columnStyle = {
    flex: "1 1 120px",
    minWidth: 120,
  };

  const sectionTitleStyle = {
    color: "#EC1877",
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    display: "block",
    textDecoration: "none",
  };

  const linkStyle = {
    color: "#fff",
    fontSize: 14,
    fontWeight: 400,
    textDecoration: "none",
    display: "block",
    marginBottom: 8,
    whiteSpace: "nowrap",
  };

  return (
    <>
      <div style={searchBarStyle}>
        {isMobile ? (
          <>
            {/* Botón hamburguesa */}
            <div onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={iconStyle}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Logo centrado */}
            <Link to="/" style={{ position: "absolute",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  zIndex: 1, }}>
              <img src="/longlogo.svg" alt="GcCustoms" style={logoStyle} />
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Icono de búsqueda */}
              <div onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} style={iconStyle}>
                <FaSearch />
              </div>

              {/* Personita */}
              <Link to="/signup" style={iconStyle}>
                <FaUser />
              </Link>

              {/* Carrito con badge */}
              <div style={{ position: "relative" }}>
                <Link to="/cart" style={iconStyle}>
                  <FaShoppingCart />
                </Link>
                {cartCount > 0 && <span style={cartBadgeStyle}>{cartCount}</span>}
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/">
              <img src="/longlogo.svg" alt="GcCustoms" style={logoStyle} />
            </Link>

            <div style={searchInputContainer}>
              <input
                type="text"
                placeholder="¿Qué buscas hoy?"
                style={searchInputStyle}
              />
            </div>

            <div style={rightIconsContainer}>
              <Link to="/signup" style={iconStyle}>
                <FaUser />
              </Link>
              <div style={{ position: "relative" }}>
                <Link to="/cart" style={iconStyle}>
                  <FaShoppingCart />
                </Link>
                {cartCount > 0 && <span style={cartBadgeStyle}>{cartCount}</span>}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Barra de búsqueda emergente en mobile */}
      {isMobile && isMobileSearchOpen && (
        <div style={{
          position: "fixed",
          top: 80,
          left: 0,
          width: "100%",
          padding: "10px 20px",
          backgroundColor: "#111",
          zIndex: 1001,
        }}>
          <input
            type="text"
            placeholder="¿Qué buscas hoy?"
            style={{ ...searchInputStyle, width: "100%",
                                          maxWidth: 500,
                                          display: "block",
                                          margin: "0 auto", }}
          />
        </div>
      )}

      {/* Menú desktop */}
      <nav style={menuBarStyle}>
  <div style={containerStyle}>
    <div style={menuStyle}>
      {MENU_DATA.map((menu, idx) => {
        if (menu.sections) {
          return (
            <div
              key={menu.label}
              onMouseEnter={() => setOpenDropdown(idx)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span
                style={{
                  ...itemStyle,
                  color: openDropdown === idx ? "#EC1877" : "#fff",
                  transition: "color 0.2s ease",
                }}
              >
                {menu.label}
              </span>
            </div>
          );
        }

        return (
          <Link
            key={menu.label}
            to={menu.url}
            style={{
              ...itemStyle,
              color: "#fff",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#EC1877")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
          >
            {menu.label}
          </Link>
        );
      })}
    </div>
  </div>
</nav>

      {/* Dropdown de escritorio */}
      <AnimatePresence>
  {openDropdown !== null && MENU_DATA[openDropdown].sections && (
    <motion.div
      key="desktop-dropdown"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 130, // debajo del menú principal
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "transparent",
        pointerEvents: "none", // evita bloquear mouse afuera del contenido real
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 30,
          pointerEvents: "auto", // habilita interacción
        }}
        onMouseEnter={() => setOpenDropdown(openDropdown)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        {MENU_DATA[openDropdown].sections.map((section) => (
          <div key={section.title} style={{ flex: "1 1 120px", minWidth: 120 }}>
            <span style={{
              color: "#EC1877",
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 12,
              display: "block",
            }}>
              {section.title}
            </span>
            {section.links.map((link) => (
              <Link
                key={link.name}
                to={link.url}
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 400,
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 8,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#EC1877";
                  e.target.style.paddingLeft = "8px";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#fff";
                  e.target.style.paddingLeft = "0px";
                }}
                onClick={() => setOpenDropdown(null)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>




      {/* Menú Mobile */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: isMobileSearchOpen ? 120 : 80,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 1001,
          padding: 20,
          overflowY: "auto",
          maxHeight: "calc(100vh - 80px)",
        }}>
          {MENU_DATA.map((item, idx) => {
            const hasDropdown = !!item.sections;

            return (
              <div key={item.label} style={{ marginBottom: 12 }}>
                {hasDropdown ? (
  <>
    <div
      onClick={() =>
        setOpenMobileDropdown(openMobileDropdown === idx ? null : idx)
      }
      style={{
        color: "#fff",
        fontWeight: 600,
        fontSize: 16,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {item.label}
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.3s ease",
          transform: openMobileDropdown === idx ? "rotate(180deg)" : "rotate(0deg)",
          fontSize: 14,
        }}
      >
        ▼
      </span>
    </div>

    <AnimatePresence initial={false}>
      {openMobileDropdown === idx && (
        <motion.div
          key={`mobile-dropdown-${idx}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            overflow: "hidden",
            marginLeft: 12,
            marginTop: 8,
          }}
        >
          {item.sections.map((section) => (
            <div key={section.title} style={{ marginBottom: 10 }}>
              <div style={{ color: "#EC1877", fontWeight: 500, fontSize: 14 }}>
                {section.title}
              </div>
              {section.links.map((link) => (
                <Link
                  key={link.name}
                  to={link.url}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    display: "block",
                    marginTop: 4,
                    fontSize: 14,
                    transition: "color 0.2s ease, padding-left 0.2s ease",
                    paddingLeft: 0,
                  }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setOpenMobileDropdown(null);
                    setIsMobileSearchOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </>
) : (
  <Link
    to={item.url}
    style={{
      color: "#fff",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: 16,
      display: "block",
      transition: "color 0.2s ease",
    }}
    onClick={() => setIsMobileMenuOpen(false)}
  >
    {item.label}
  </Link>
)}

              </div>
            );
          })}
        </div>
      )}
    </>
  );
}