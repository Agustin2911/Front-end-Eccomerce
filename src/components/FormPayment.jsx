import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { clearCart } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setAddress,
  setTakeawayType,
  setCardName,
  setCardNumber,
  setExpiry,
  setCvv,
  setCardType,
  setSelectedStore,
} from "../features/fetch/checkoutSlice";
import { processPayment } from "../features/fetch/paymentSlice";
function FormPayment() {
  const user = useSelector((state) => state.user);
  const [verify_address, setVerify_address] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const stores = ["Sucursal Centro", "Sucursal Norte", "Sucursal Sur"];
  const cart = useSelector((state) => state.cart.items);
  const checkout = useSelector((state) => state.checkout);

  const dispatch = useDispatch();

  useEffect(() => {
    let Total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
    Total += Total * 0.21;
    setTotal(Total);
  }, [cart]);

  async function address_verification() {
    if (checkout.takeawayType === "delivery") {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${checkout.address}&format=json`
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

    if (
      !checkout.cardName ||
      !checkout.cardType ||
      !checkout.expiry ||
      !checkout.cvv
    ) {
      alert("Faltan datos de pago");
      return;
    }

    try {
      await dispatch(processPayment({ user, checkout, total })).unwrap();
      alert("Pago procesado correctamente.");
      dispatch(clearCart());
      navigate("/");
    } catch (err) {
      console.error("Error al procesar el pago:", err);
      alert("Hubo un error al procesar el pago.");
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
            checked={checkout.takeawayType === "local"}
            onChange={() => dispatch(setTakeawayType("local"))}
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
            checked={checkout.takeawayType === "delivery"}
            onChange={() => dispatch(setTakeawayType("delivery"))}
          />
          <label className="btn btn-outline-primary w-50" htmlFor="delivery">
            A domicilio
          </label>
        </div>

        {checkout.takeawayType === "local" && (
          <Box mt={4}>
            <label className="form-label text-start w-100">
              Selecciona la sucursal
            </label>
            <select
              className="form-select"
              onChange={(e) => dispatch(setSelectedStore(e.target.value))}
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

        {checkout.takeawayType === "delivery" && (
          <Box mt={4}>
            <label className="form-label text-start w-100">
              Dirección de entrega
            </label>
            <input
              type="text"
              className={`form-control ${verify_address ? "is-invalid" : ""}`}
              placeholder="Ingrese su dirección"
              value={checkout.address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
            />
          </Box>
        )}

        <Box mt={6}>
          <h4 className="mb-3">Datos de la tarjeta</h4>

          <div className="mb-3 text-start">
            <label className="form-label">Nombre del titular</label>
            <input
              className="form-control"
              value={checkout.cardName}
              onChange={(e) => dispatch(setCardName(e.target.value))}
              placeholder="Nombre como aparece en la tarjeta"
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Número de tarjeta</label>
            <input
              className="form-control"
              value={checkout.cardNumber}
              onChange={(e) => dispatch(setCardNumber(e.target.value))}
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={19}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Fecha de vencimiento</label>
            <input
              className="form-control"
              value={checkout.expiry}
              onChange={(e) => dispatch(setExpiry(e.target.value))}
              placeholder="MM/AA"
              maxLength={5}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Código de seguridad (CVV)</label>
            <input
              className="form-control"
              value={checkout.cvv}
              onChange={(e) => dispatch(setCvv(e.target.value))}
              placeholder="CVV"
              maxLength={4}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Tipo de tarjeta</label>
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select w-auto"
                value={checkout.cardType}
                onChange={(e) => dispatch(setCardType(e.target.value))}
              >
                <option value="">Seleccione un tipo</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Amex">American Express</option>
              </select>

              {checkout.cardType && (
                <img
                  src={
                    checkout.cardType === "Visa"
                      ? "https://imgs.search.brave.com/-99fU82RTcmgAwMafZKA3slDPJ_pROGyTGTbrzfYFYo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kb3J2/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDcvVmlz/YS1Mb2dvLTIwMTQu/anBn"
                      : checkout.cardType === "MasterCard"
                      ? "https://imgs.search.brave.com/Vk40RDA5rb0qv4Xy8TI8_4PSQPg3JQefyJKBHhf-aBc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly92aXN1/YWxoaWVyYXJjaHku/Y28vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMDgvbWFzdGVy/Y2FyZC1sb2dvLTIw/MTYtMjAyMC53ZWJw"
                      : "https://imgs.search.brave.com/Fhu2CcWTPXjqrhsyl9F5yeZwNVkpZ2j13hFaEpgxoaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzM4L0FtZXJpY2Fu/X0V4cHJlc3MucG5n"
                  }
                  alt={checkout.cardType}
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
                <strong>
                  ${element.price} x {element.amount}
                </strong>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between">
              <span>Envío</span>
              <strong>
                {checkout.takeawayType === "delivery" ? "$1.000" : "$0"}
              </strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Impuestos</span>
              <strong>${total * 0.21}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>
                $
                {checkout.takeawayType === "delivery" ? "$5.950" : total * 1.21}
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
