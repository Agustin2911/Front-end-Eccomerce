import React, { useState } from 'react';
import './MisPedidos.css';

const MisPedidos = ({ token }) => {
  const [showHistorial, setShowHistorial] = useState(false);

  // Datos estáticos (a pedido de capi)
  const pedidosActivos = [
    {
      id: "PED-2024-001",
      fecha: "2024-05-28",
      estado: "En preparación",
      total: 3120000,
      items: [
        { nombre: "RAM Forgeon Cyclone PLUS", cantidad: 2, precio: 120000 },
        { nombre: "GeForce RTX 5060 Ti Twin Edge", cantidad: 1, precio: 3000000 }
      ]
    },
    {
      id: "PED-2024-002", 
      fecha: "2024-05-30",
      estado: "En camino",
      total: 189000,
      items: [
        { nombre: "Forgeon Captain RGB", cantidad: 1, precio: 89000 },
        { nombre: "Forgeon Clutch Teclado Gaming", cantidad: 1, precio: 50000 },
        { nombre: "Forgeon Darrowspike RGB Ratón Gaming", cantidad: 1, precio: 50000 }
      ]
    },
    {
      id: "PED-2024-003",
      fecha: "2024-06-01",
      estado: "Confirmado",
      total: 54000,
      items: [
        { nombre: "ASUS Spatha X Ratón Gaming", cantidad: 1, precio: 54000 },
      ]
    }
  ];

  const pedidosEntregados = [
    {
      id: "PED-2024-045",
      fecha: "2024-05-20",
      estado: "Entregado",
      total: 70650,
      rating: 5,
      items: [
        { nombre: "HyperX Earbuds II Auriculares Gaming", cantidad: 1, precio: 30150 },
        { nombre: "Logitech G502 Hero", cantidad: 1, precio: 40500 }
      ]
    },
    {
      id: "PED-2024-033",
      fecha: "2024-05-15",
      estado: "Entregado", 
      total: 460000,
      rating: 4,
      items: [
        { nombre: "Monitor Alurin CoreVision", cantidad: 2, precio: 230000 }
      ]
    },
    {
      id: "PED-2024-028",
      fecha: "2024-05-10",
      estado: "Entregado",
      total: 35600,
      rating: 5,
      items: [
        { nombre: "PcCom Essential Cable HDMI a VGA", cantidad: 4, precio: 8900 }
      ]
    },
  ];

  const getEstadoClass = (estado) => {
    const classes = {
      "Confirmado": "estado-confirmado",
      "En preparación": "estado-preparacion",
      "En camino": "estado-camino",
      "Entregado": "estado-entregado"
    };
    return classes[estado] || "estado-confirmado";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const EstadoBadge = ({ estado }) => {
    const estadoClass = getEstadoClass(estado);
    
    return (
      <span className={`estado-badge ${estadoClass}`}>
        {estado}
      </span>
    );
  };

  const RatingStars = ({ rating }) => {
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${i < rating ? 'star-filled' : 'star-empty'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const PedidoCard = ({ pedido, showRating = false }) => (
    <div className="pedido-card">
      {/* Header del pedido */}
      <div className="pedido-header">
        <div className="pedido-info">
          <h3>{pedido.id}</h3>
          <p>{formatDate(pedido.fecha)}</p>
        </div>
        <div className="pedido-status">
          <EstadoBadge estado={pedido.estado} />
          {showRating && <RatingStars rating={pedido.rating} />}
        </div>
      </div>

      {/* Divisor */}
      <hr className="divider" />

      {/* Items del pedido */}
      <div className="pedido-items">
        {pedido.items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="item-info">
              <span className="item-name">{item.nombre}</span>
              <span className="item-quantity">x{item.cantidad}</span>
            </div>
            <span className="item-price">{formatPrice(item.precio)}</span>
          </div>
        ))}
      </div>

      {/* Divisor */}
      <hr className="divider" />

      {/* Total */}
      <div className="pedido-total">
        <span className="total-label">Total:</span>
        <span className="total-amount">{formatPrice(pedido.total)}</span>
      </div>
    </div>
  );

  // Si no hay token, mostrar mensaje de login
  if (!token) {
    return (
      <div className="mis-pedidos-container">
        <div className="login-required">
          <h2>🔒 Inicia sesión para ver tus pedidos</h2>
          <p>Necesitas estar logueado para acceder a esta sección</p>
          <button 
            className="btn-login"
            onClick={() => window.location.href = '/signup'}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-pedidos-container">
      {/* Header */}
      <div className="header">
        <h1>Mis Pedidos</h1>
        <p>Seguí el estado de tus pedidos y consultá tu historial</p>
      </div>

      {/* Pedidos Activos */}
      <div className="section">
        <h2 className="section-title">
          📦 Pedidos Activos
        </h2>
        <div className="pedidos-grid">
          {pedidosActivos.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} />
          ))}
        </div>
      </div>

      {/* Historial de Pedidos */}
      <div className="section">
        <h2 className="section-title">Pedidos Anteriores</h2>
        
        <div className="historial-container">
          <button
            onClick={() => setShowHistorial(!showHistorial)}
            className="historial-toggle"
          >
            <div className="historial-toggle-info">
              <h3>Historial de Entregas ({pedidosEntregados.length} pedidos)</h3>
              <p>Ver todos los pedidos entregados</p>
            </div>
            <span className="historial-toggle-icon">
              {showHistorial ? '▲' : '▼'}
            </span>
          </button>
          
          {showHistorial && (
            <div className="historial-content">
              {pedidosEntregados.map((pedido) => (
                <PedidoCard 
                  key={pedido.id} 
                  pedido={pedido} 
                  showRating={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="estadisticas">
        <h2>Resumen de Actividad</h2>
        <div className="estadisticas-grid">
          <div className="estadistica-item">
            <div className="estadistica-numero azul">
              {pedidosActivos.length}
            </div>
            <div className="estadistica-label">
              Pedidos Activos
            </div>
          </div>
          <div className="estadistica-item">
            <div className="estadistica-numero verde">
              {pedidosEntregados.length}
            </div>
            <div className="estadistica-label">
              Pedidos Entregados
            </div>
          </div>
          <div className="estadistica-item">
            <div className="estadistica-numero morado">
              {formatPrice(pedidosEntregados.reduce((sum, p) => sum + p.total, 0))}
            </div>
            <div className="estadistica-label">
              Total Gastado
            </div>
          </div>
          <div className="estadistica-item">
            <div className="estadistica-numero naranja">
              4.5
            </div>
            <div className="estadistica-label">
              Rating Promedio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisPedidos;