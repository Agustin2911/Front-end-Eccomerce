// src/components/MainNavbar.js
import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Link as ChakraLink, Button } from "@chakra-ui/react";


const MENU_DATA = [
  {
    label: "PCs Armadas",
    sections: [
      {
        // Category ID = 1
        title: "PCs Armadas",
        url: "/products/category/1",
        links: [
          // id_sub_category = 1
          { name: "PC Gamer", url: "/products/subCategory/1" },
          // id_sub_category = 2
          { name: "PC Oficina", url: "/products/subCategory/2" },
          // id_sub_category = 3
          { name: "PC Workstation", url: "/products/subCategory/3" },
        ],
      },
    ],
  },
  {
    label: "Hardware",
    sections: [
      {


        // Category ID = 2
        title: "Placas de Video",
        url: "/products/category/2",
        links: [
          // id_sub_category = 4
          { name: "AMD Radeon", url: "/products/subCategory/4" },
          // id_sub_category = 5
          { name: "NVIDIA Geforce", url: "/products/subCategory/5" },
        ],
      },
      {
        // Category ID = 3
        title: "Procesadores",
        url: "/products/category/3",
        links: [
          // id_sub_category = 6
          { name: "AMD", url: "/products/subCategory/6" },
          // id_sub_category = 7
          { name: "Intel", url: "/products/subCategory/7" },
        ],
      },
      {
        // Category ID = 4
        title: "Componentes",
        url: "/products/category/4",
        links: [
          // id_sub_category = 8
          { name: "Motherboards", url: "/products/subCategory/8" },
          // id_sub_category = 9
          { name: "Fuentes", url: "/products/subCategory/9" },
          // id_sub_category = 10
          { name: "Refrigeración", url: "/products/subCategory/10" },
          // id_sub_category = 11
          { name: "Gabinetes", url: "/products/subCategory/11" },
          // id_sub_category = 12
          { name: "Conectividad y Redes", url: "/products/subCategory/12" },
        ],
      },
      {
        // Category ID = 5
        title: "Almacenamiento",
        url: "/products/category/5",
        links: [
          // id_sub_category = 13
          { name: "Discos SATA", url: "/products/subCategory/13" },
          // id_sub_category = 14
          { name: "Discos Externos", url: "/products/subCategory/14" },
          // id_sub_category = 15
          { name: "Discos SSD", url: "/products/subCategory/15" },
        ],
      },
      {
        // Category ID = 6
        title: "Memorias RAM",
        url: "/products/category/6",
        links: [
          // id_sub_category = 16
          { name: "DDR3", url: "/products/subCategory/16" },
          // id_sub_category = 17
          { name: "DDR4", url: "/products/subCategory/17" },
          // id_sub_category = 18
          { name: "DDR5", url: "/products/subCategory/18" },
          // id_sub_category = 19
          { name: "SODIMM DDR4", url: "/products/subCategory/19" },
          // id_sub_category = 20
          { name: "SODIMM DDR5", url: "/products/subCategory/20" },

        ],
      },
    ],
  },
  {
    label: "Periféricos",
    sections: [
      {

        // Category ID = 7
        title: "Teclados",
        url: "/products/category/7",
        links: [
          // id_sub_category = 21
          { name: "Teclados Inalámbricos", url: "/products/subCategory/21" },
          // id_sub_category = 22
          { name: "Teclados Gamer", url: "/products/subCategory/22" },
          // id_sub_category = 23
          { name: "Teclados USB", url: "/products/subCategory/23" },
        ],
      },
      {
        // Category ID = 8
        title: "Mouses",
        url: "/products/category/8",
        links: [
          // id_sub_category = 24
          { name: "Mouses Inalámbricos", url: "/products/subCategory/24" },
          // id_sub_category = 25
          { name: "Mouses Gamer", url: "/products/subCategory/25" },
          // id_sub_category = 26
          { name: "Mouses USB", url: "/products/subCategory/26" },
        ],
      },
      {
        // Category ID = 9
        title: "Auriculares",
        url: "/products/category/9",
        links: [
          // id_sub_category = 27
          { name: "Auriculares Inalámbricos", url: "/products/subCategory/27" },
          // id_sub_category = 28
          { name: "Auriculares Gamer", url: "/products/subCategory/28" },
          // id_sub_category = 29
          {
            name: "Auriculares con Micrófono",
            url: "/products/subCategory/29",
          },
        ],
      },
      {
        // Category ID = 10
        title: "Accesorios",
        url: "/products/category/10",
        links: [
          // id_sub_category = 30
          { name: "Mousepads", url: "/products/subCategory/30" },
          // id_sub_category = 31
          { name: "Joysticks", url: "/products/subCategory/31" },
        ],
      },
      {
        // Category ID = 11
        title: "Streaming",
        url: "/products/category/11",
        links: [
          // id_sub_category = 32
          { name: "Webcams", url: "/products/subCategory/32" },
          // id_sub_category = 33
          { name: "Micrófonos", url: "/products/subCategory/33" },
          // id_sub_category = 34
          { name: "Capturadoras de Video", url: "/products/subCategory/34" },
          // id_sub_category = 35
          { name: "Stream Decks", url: "/products/subCategory/35" },
        ],
      },
      {
        // Category ID = 12
        title: "Otros",
        url: "/products/category/12",
        links: [
          // id_sub_category = 36
          { name: "Pendrives", url: "/products/subCategory/36" },
          // id_sub_category = 37
          { name: "Sillas Gamer", url: "/products/subCategory/37" },
          // id_sub_category = 38

          { name: "Impresoras",       url: "/products/subCategory/38" },
          // id_sub_category = 39
          { name: "Proyectores",      url: "/products/subCategory/39" },


        ],
      },
    ],
  },

  // ----------------------
  // CATEGORÍAS SIN DROPDOWN (solo link directo)
  // ----------------------

  {
    label: "Notebooks",
    url: "/products/category/13",
  },
  {
    label: "Monitores",
    url: "/products/category/14",
  },
  {
    label: "Ver Todo",
    url: "/products",
  },
];

export default function MainNavbar({ cartCount = 0, type, id_user }) {

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 858);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed.length > 0) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      setSearchTerm("");
      setIsMobileSearchOpen(false);
    }
  };


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

            <div
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={iconStyle}
            >

              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Logo centrado */}

            <Link
              to="/"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
              }}
            >

              <img src="/longlogo.svg" alt="GcCustoms" style={logoStyle} />
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Icono de búsqueda */}

              <div
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                style={iconStyle}
              >
                <FaSearch />
              </div>

              <Link
                to={
                  type === "buyer"
                    ? `/myorders/${id_user}`
                    : type === "seller"
                    ? `/publish/${id_user}` // futuro link para seller
                    : type === "admin"
                    ? `/admin`
                    : "/signup"
                }
                style={iconStyle}
              >

                <FaUser />
              </Link>

              {/* Carrito con badge */}
            {type != "admin" &&
              <div style={{ position: "relative" }}>
                <Link to="/cart" style={iconStyle}>
                  <FaShoppingCart />
                </Link>

                {cartCount > 0 && (
                  <span style={cartBadgeStyle}>{cartCount}</span>
                )}

              </div>
            }
            </div>
          </>
        ) : (
          <>
            <Link to="/">
              <img src="/longlogo.svg" alt="GcCustoms" style={logoStyle} />
            </Link>


            <form onSubmit={handleSearchSubmit} style={searchInputContainer}>

              <input
                type="text"
                placeholder="¿Qué buscas hoy?"
                style={searchInputStyle}

                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <div style={rightIconsContainer}>
            {id_user != null &&  
            <ChakraLink 
                href="/signup" 
                _hover={{ textDecoration: "none" }}
                style = {{textDecoration: "none"}}
                textDecoration="none"
                color={"#ec1877"}>
                    <Button>
                        Cerrar Sesión
                    </Button>

            
              </ChakraLink>
            }
              <Link
                to={
                  type === "buyer"
                    ? `/myorders/${id_user}`
                    : type === "seller"
                    ? `/publish/${id_user}` // futuro link para seller
                    : type === "admin"
                    ? `/admin`
                    : "/signup"

                }
                style={iconStyle}
              >

                <FaUser />
              </Link>
            {type != "admin" &&
              <div style={{ position: "relative" }}>
                <Link to="/cart" style={iconStyle}>
                  <FaShoppingCart />
                </Link>

                {cartCount > 0 && (
                  <span style={cartBadgeStyle}>{cartCount}</span>
                )}

              </div>
            }
            </div>
          </>
        )}
      </div>

      {/* Barra de búsqueda emergente en mobile */}
      {isMobile && isMobileSearchOpen && (

        <div
          style={{
            position: "fixed",
            top: 80,
            left: 0,
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            zIndex: 1005,
          }}
        >
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="¿Qué buscas hoy?"
              style={{
                ...searchInputStyle,
                width: "100%",
                maxWidth: 500,
                display: "block",
                margin: "0 auto",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

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
      <div
        style={{
          height: isMobile ? (isMobileSearchOpen ? 120 : 80) : 140,
        }}
      />

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
                <div
                  key={section.title}
                  style={{ flex: "1 1 120px", minWidth: 120 }}
                >
                  {/* Ahora el título es un <Link> clickeable */}
                  {section.url ? (
                    <Link
                      to={section.url}
                      style={sectionTitleStyle}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {section.title}
                    </Link>
                  ) : (
                    <span style={sectionTitleStyle}>{section.title}</span>
                  )}

                  {section.links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.url}
                      style={linkStyle}
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
        <div
          style={{
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
          }}
        >
          {MENU_DATA.map((item, idx) => {
            const hasDropdown = !!item.sections;

            return (
              <div key={item.label} style={{ marginBottom: 12 }}>
                {hasDropdown ? (
                  <>
                    <div
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === idx ? null : idx
                        )
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
                          transform:
                            openMobileDropdown === idx
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
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
                            <div
                              key={section.title}
                              style={{ marginBottom: 10 }}
                            >
                              {/* Aquí también hacemos clickeable el title usando section.url */}
                              {section.url ? (
                                <Link
                                  to={section.url}
                                  style={{
                                    color: "#EC1877",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    textDecoration: "none",
                                  }}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setOpenMobileDropdown(null);
                                    setIsMobileSearchOpen(false);
                                  }}
                                >
                                  {section.title}
                                </Link>
                              ) : (
                                <div
                                  style={{
                                    color: "#EC1877",
                                    fontWeight: 500,
                                    fontSize: 14,
                                  }}
                                >
                                  {section.title}
                                </div>
                              )}

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
                                    transition:
                                      "color 0.2s ease, padding-left 0.2s ease",
                                    paddingLeft: 0,
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.color = "#EC1877";
                                    e.target.style.paddingLeft = "8px";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.color = "#fff";
                                    e.target.style.paddingLeft = "0px";
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
