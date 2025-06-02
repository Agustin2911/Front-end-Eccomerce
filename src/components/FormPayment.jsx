import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function FormPayment({ cart, setcart, id_usuario, Token_usuario }) {
  console.log(cart);

  const [address, setAddress] = useState("");
  const [verify_address, setVerify_address] = useState(false);
  const [takeawayType, setTakeawayType] = useState("local");
  const [selectedStore, setSelectedStore] = useState("");
  const [total, setTotal] = useState(0);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const navigate = useNavigate();
  const stores = ["Sucursal Centro", "Sucursal Norte", "Sucursal Sur"];

  useEffect(() => {
    let Total = cart.reduce((acc, item) => acc + item.price, 0);
    Total += Total * 0.21;
    setTotal(Total);
  }, [cart]);

  async function address_verification() {
    if (takeawayType === "delivery") {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
        );
        const data = await response.json();
        setVerify_address(data.length <= 0);
        return data.length > 0;
      } catch (error) {
        console.error("Error en la verificación de dirección:", error);
        setVerify_address(true);
        return false;
      }
    }
    return true;
  }

  async function generate_payment() {
    const result = await address_verification();
    if (!result) {
      alert("La dirección ingresada no es válida");
      return;
    }

    if (!takeawayType || !cardName || !expiry || !cvv || !cardType) {
      alert("Faltan campos por completar!");
      return;
    }

    // Mapear la sucursal a ID
    const storeIdMap = {
      "Sucursal Centro": 1,
      "Sucursal Norte": 2,
      "Sucursal Sur": 3,
    };

    const saleData = {
      total_price: Math.round(total),
      id_user: id_usuario,
      sale_date: new Date().toISOString(),
      items: cart.map((item) => ({
        id_product: item.id_product,
        amount: -item.amount,
      })),
      id_shop: 1,
      delivery_type: takeawayType === "delivery" ? "Envio" : "Takeaway",
      address:
        takeawayType === "delivery"
          ? address
          : selectedStore === "Sucursal Centro"
          ? "Av. Siempre Viva 123"
          : selectedStore === "Sucursal Norte"
          ? "Calle Norte 456"
          : "Calle Sur 789",
      delivery_status: "Pendiente",
    };

    try {
      const response = await fetch("http://localhost:1273/sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      });

      if (response.ok) {
        alert("Pago procesado correctamente.");
        setcart([]);
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Error en el servidor:", errorData);
        alert("Hubo un error al procesar el pago.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al conectar con el servidor.");
    }
  }

  return (
    <Box h="auto" py={8} display="flex" justifyContent="center" mt={"50px"}>
      <style>
        {`
      .pagar-btn {
        display: inline-block;
        padding: .75rem 1.25rem;
        border-radius: 10rem;
        color: #fff;
        text-transform: uppercase;
        font-size: 1rem;
        letter-spacing: .15rem;
        transition: all .3s;
        position: relative;
        overflow: hidden;
        z-index: 1;
        background-color:#ec1877 ;
      }

      .pagar-btn::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:#ae5bdd;
        border-radius: 10rem;
        z-index: -2;
      }

      .pagar-btn::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color:#ec1877; /* darken(#0cf, 15%) */
        transition: all .3s;
        border-radius: 10rem;
        z-index: -1;
      }

      .pagar-btn:hover {
        color: #fff;
      }

      .pagar-btn:hover::before {
        width: 100%;
      }
            .btn-outline-primary {
      color: #d3a5ee;
      border-color: #d3a5ee;
    }

    .btn-outline-primary:hover {
      background-color: #d3a5ee;
      color: #fff;
    }

    .btn-check:checked + .btn-outline-primary {
      background-color: #ae5bdd;
      color: #fff;
      border-color: #ae5bdd;
    }
    `}
      </style>
      <Box
        className="container p-4 rounded shadow bg-light text-center"
        w={{ base: "350px", md: "600px" }}
      >
        <h2 className="mb-3">Checkout</h2>

        <div className="btn-group d-flex" role="group">
          <input
            type="radio"
            className="btn-check"
            name="takeaway"
            id="local"
            value="local"
            checked={takeawayType === "local"}
            onChange={() => setTakeawayType("local")}
          />
          <label className="btn btn-outline-primary w-50" htmlFor="local">
            En el local
          </label>

          <input
            type="radio"
            className="btn-check"
            name="takeaway"
            id="delivery"
            value="delivery"
            checked={takeawayType === "delivery"}
            onChange={() => setTakeawayType("delivery")}
          />
          <label className="btn btn-outline-primary w-50" htmlFor="delivery">
            A domicilio
          </label>
        </div>

        {takeawayType === "local" && (
          <Box mt={4}>
            <label className="form-label text-start w-100">
              Selecciona la sucursal
            </label>
            <select
              className="form-select"
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value="">Seleccione una sucursal</option>
              {stores.map((store, index) => (
                <option key={index} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </Box>
        )}

        {takeawayType === "delivery" && (
          <Box mt={4}>
            <label className="form-label text-start w-100">
              Dirección de entrega
            </label>
            <input
              type="text"
              className={`form-control ${verify_address ? "is-invalid" : ""}`}
              placeholder="Ingrese su dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
        )}

        <Box mt={6}>
          <h4 className="mb-3">Datos de la tarjeta</h4>

          <div className="mb-3 text-start">
            <label className="form-label">Nombre del titular</label>
            <input
              className="form-control"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Nombre como aparece en la tarjeta"
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Número de tarjeta</label>
            <input
              className="form-control"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={19}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Fecha de vencimiento</label>
            <input
              className="form-control"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/AA"
              maxLength={5}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Código de seguridad (CVV)</label>
            <input
              className="form-control"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
              maxLength={4}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Tipo de tarjeta</label>
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select w-auto"
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
              >
                <option value="">Seleccione un tipo</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Amex">American Express</option>
              </select>

              {cardType && (
                <img
                  src={
                    cardType === "Visa"
                      ? "https://imgs.search.brave.com/-99fU82RTcmgAwMafZKA3slDPJ_pROGyTGTbrzfYFYo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kb3J2/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDcvVmlz/YS1Mb2dvLTIwMTQu/anBn"
                      : cardType === "MasterCard"
                      ? "https://imgs.search.brave.com/Vk40RDA5rb0qv4Xy8TI8_4PSQPg3JQefyJKBHhf-aBc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly92aXN1/YWxoaWVyYXJjaHku/Y28vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMDgvbWFzdGVy/Y2FyZC1sb2dvLTIw/MTYtMjAyMC53ZWJw"
                      : "https://imgs.search.brave.com/Fhu2CcWTPXjqrhsyl9F5yeZwNVkpZ2j13hFaEpgxoaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzM4L0FtZXJpY2Fu/X0V4cHJlc3MucG5n"
                  }
                  alt={cardType}
                  style={{ width: "40px", height: "auto" }}
                />
              )}
            </div>
          </div>
        </Box>
        <Box mt={6} mb={6} className="text-start">
          <h4 className="mb-3">Resumen del pago</h4>
          <ul className="list-group">
            {cart.map((element) => (
              <li className="list-group-item d-flex justify-content-between">
                <span>{element.product_name}</span>
                <strong>${element.price}</strong>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between">
              <span>Envío</span>
              <strong>{takeawayType === "delivery" ? "$1.000" : "$0"}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Impuestos</span>
              <strong>${total * 0.21}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>
                ${takeawayType === "delivery" ? "$5.950" : total * 1.21}
              </strong>
            </li>
          </ul>
        </Box>

        <button className="pagar-btn" onClick={generate_payment}>
          Pagar
        </button>
      </Box>
    </Box>
  );
}

export default FormPayment;
