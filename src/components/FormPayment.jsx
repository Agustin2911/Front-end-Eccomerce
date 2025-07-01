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
import { toast, ToastContainer, Zoom } from "react-toastify";

function FormPayment() {
  const user = useSelector((state) => state.user);
  const [verify_address, setVerify_address] = useState(false);
  const [total, setTotal] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
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

  // Función para obtener el máximo de dígitos del CVV según el tipo de tarjeta
  const getCvvMaxLength = () => {
    return checkout.cardType === 'Amex' ? 4 : 3;
  };

  // Función para validar fecha de vencimiento con detalles específicos
  const validateExpiryDate = (expiryString) => {
    if (!expiryString || expiryString.length !== 5 || !expiryString.includes('/')) {
      return { isValid: false, invalidMonth: true, invalidYear: true };
    }

    const [monthStr, yearStr] = expiryString.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt('20' + yearStr, 10);

    // Obtener fecha actual del sistema
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let invalidMonth = false;
    let invalidYear = false;

    // Validar mes (01-12)
    if (month < 1 || month > 12) {
      invalidMonth = true;
    }

    // Validar año (no puede ser menor al actual, y si es el año actual, el mes debe ser mayor al actual)
    if (year < currentYear) {
      invalidYear = true;
    } else if (year === currentYear && month <= currentMonth) {
      invalidYear = true;
    }

    const isValid = !invalidMonth && !invalidYear;

    return { isValid, invalidMonth, invalidYear };
  };

  // Función para validar todos los campos
  const validateFields = () => {
    const errors = {};

    // Validar nombre del titular
    if (!checkout.cardName || checkout.cardName.trim().length === 0) {
      errors.cardName = true;
    }

    // Validar número de tarjeta (debe tener 16 dígitos sin espacios)
    const cardNumberDigits = checkout.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits || cardNumberDigits.length !== 16) {
      errors.cardNumber = true;
    }

    // Validar fecha de vencimiento con validación detallada
    const expiryValidation = validateExpiryDate(checkout.expiry);
    if (!expiryValidation.isValid) {
      errors.expiry = true;
      errors.expiryDetails = {
        invalidMonth: expiryValidation.invalidMonth,
        invalidYear: expiryValidation.invalidYear
      };
    }

    // Validar CVV con longitud dinámica según el tipo de tarjeta
    const expectedCvvLength = getCvvMaxLength();
    if (!checkout.cvv || checkout.cvv.length !== expectedCvvLength) {
      errors.cvv = true;
    }

    // Validar tipo de tarjeta
    if (!checkout.cardType) {
      errors.cardType = true;
    }

    // Validar según el tipo de entrega
    if (checkout.takeawayType === "delivery") {
      if (!checkout.address || checkout.address.trim().length === 0) {
        errors.address = true;
      }
    } else if (checkout.takeawayType === "local") {
      if (!checkout.selectedStore) {
        errors.selectedStore = true;
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validar en tiempo real después del primer intento de envío
  useEffect(() => {
    if (hasAttemptedSubmit) {
      validateFields();
    }
  }, [checkout, hasAttemptedSubmit]);

  // Función para formatear número de tarjeta (solo para display)
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Función para obtener el valor sin formato (para enviar al backend)
  const getUnformattedCardNumber = (formattedValue) => {
    return formattedValue.replace(/\s/g, '');
  };

  const getUnformattedExpiry = (formattedValue) => {
    return formattedValue.replace(/\//g, '');
  };

  // Función para manejar cambio en número de tarjeta
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      dispatch(setCardNumber(formatted));
    }
  };

  // Función mejorada para manejar cambio en fecha de vencimiento
  const handleExpiryChange = (e) => {
    let value = e.target.value;
    const digitsOnly = value.replace(/\D/g, '');
    const limitedDigits = digitsOnly.substring(0, 4);
    
    let formatted = '';
    
    if (limitedDigits.length === 0) {
      formatted = '';
    } else if (limitedDigits.length === 1) {
      if (limitedDigits === '0' || limitedDigits === '1') {
        formatted = limitedDigits;
      } else {
        formatted = '0' + limitedDigits;
      }
    } else if (limitedDigits.length === 2) {
      const month = limitedDigits;
      if (month >= '01' && month <= '12') {
        formatted = month;
      } else {
        const firstDigit = limitedDigits[0];
        if (firstDigit === '0' || firstDigit === '1') {
          formatted = firstDigit;
        } else {
          formatted = '0' + firstDigit;
        }
      }
    } else if (limitedDigits.length === 3) {
      const month = limitedDigits.substring(0, 2);
      const yearFirstDigit = limitedDigits.substring(2, 3);
      
      if (month >= '01' && month <= '12') {
        formatted = month + '/' + yearFirstDigit;
      } else {
        const correctedMonth = month >= '01' && month <= '12' ? month : '01';
        formatted = correctedMonth + '/' + yearFirstDigit;
      }
    } else if (limitedDigits.length === 4) {
      const month = limitedDigits.substring(0, 2);
      const year = limitedDigits.substring(2, 4);
      
      const validMonth = month >= '01' && month <= '12' ? month : '01';
      const validYear = year >= '00' && year <= '99' ? year : '00';
      
      formatted = validMonth + '/' + validYear;
    }
    
    dispatch(setExpiry(formatted));
  };

  // Función modificada para manejar CVV con límite dinámico
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Solo números
    const maxLength = getCvvMaxLength();
    
    if (value.length <= maxLength) {
      dispatch(setCvv(value));
    }
  };

  // Función para manejar nombre del titular (máximo 40 caracteres)
  const handleCardNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 40) {
      dispatch(setCardName(value));
    }
  };

  // Función para formatear números a 2 decimales
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  // Función para obtener mensaje de error específico para fecha
  const getExpiryErrorMessage = () => {
    if (!checkout.expiry || checkout.expiry.length !== 5) {
      return "Debe ingresar una fecha válida (MM/YY)";
    }
    
    const details = validationErrors.expiryDetails;
    if (details) {
      if (details.invalidMonth && details.invalidYear) {
        return "El mes debe estar entre 01-12 y el año debe ser posterior al actual";
      } else if (details.invalidMonth) {
        return "El mes debe estar entre 01 y 12";
      } else if (details.invalidYear) {
        return "La fecha de vencimiento debe ser posterior al mes actual";
      }
    }
    
    return "";
  };

  // Función para obtener mensaje de error específico para CVV
  const getCvvErrorMessage = () => {
    const expectedLength = getCvvMaxLength();
    const cardTypeName = checkout.cardType === 'Amex' ? 'American Express' : checkout.cardType;
    return `Debe ingresar un CVV válido de ${expectedLength} dígitos para ${cardTypeName}`;
  };

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

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function generate_payment() {
    setHasAttemptedSubmit(true);
    
    if (user.token === null) {
      toast.info("no estas registrado, se te redireccionara al login", {
        autoClose: 2500,
      });
      await sleep(3000);
      navigate("/signup");
      return;
    }

    // Validar todos los campos
    const isValid = validateFields();
    if (!isValid) {
      toast.error("Por favor, complete todos los campos requeridos correctamente", {
        autoClose: 2500,
      });
      return;
    }

    const result = await address_verification();
    if (!result) {
      toast.error(
        "la direccion ingresa no existe, verifique lo ingresado o pruebe con otra",
        {
          autoClose: 2500,
        }
      );
      return;
    }

    // Preparar datos para enviar al backend (sin formato)
    const paymentData = {
      ...checkout,
      cardNumber: getUnformattedCardNumber(checkout.cardNumber),
      expiry: getUnformattedExpiry(checkout.expiry)
    };

    try {
      await dispatch(processPayment({ user, checkout: paymentData, total })).unwrap();
      toast.success("Pago procesado correctamente.", {
        autoClose: 2500,
        theme: "colored",
      });
      await sleep(3000);
      dispatch(clearCart());
      navigate("/");
    } catch (err) {
      console.error("Error al procesar el pago:", err);
      toast.error("Hubo un error al procesar el pago.", {
        autoClose: 2500,
      });
    }
  }

  return (
    <Box h="auto" py={8} display="flex" justifyContent="center" mt={"50px"}>
      <ToastContainer transition={Zoom} />
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
        background-color:#ec1877;
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

      .form-control.is-invalid {
        border: 2px solid #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
      }

      .form-select.is-invalid {
        border: 2px solid #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
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
              className={`form-select ${validationErrors.selectedStore ? "is-invalid" : ""}`}
              value={checkout.selectedStore || ""}
              onChange={(e) => dispatch(setSelectedStore(e.target.value))}
            >
              <option value="">Seleccione una sucursal</option>
              {stores.map((store, index) => (
                <option key={index} value={store}>
                  {store}
                </option>
              ))}
            </select>
            {validationErrors.selectedStore && (
              <small className="text-danger">Debe seleccionar una sucursal</small>
            )}
          </Box>
        )}

        {checkout.takeawayType === "delivery" && (
          <Box mt={4}>
            <label className="form-label text-start w-100">
              Dirección de entrega
            </label>
            <input
              type="text"
              className={`form-control ${validationErrors.address || verify_address ? "is-invalid" : ""}`}
              placeholder="Ingrese su dirección"
              value={checkout.address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
            />
            {validationErrors.address && (
              <small className="text-danger">La dirección es requerida</small>
            )}
          </Box>
        )}

        <Box mt={6}>
          <h4 className="mb-3">Datos de la tarjeta</h4>

          <div className="mb-3 text-start">
            <label className="form-label">Nombre del titular</label>
            <input
              className={`form-control ${validationErrors.cardName ? "is-invalid" : ""}`}
              value={checkout.cardName}
              onChange={handleCardNameChange}
              placeholder="Nombre como aparece en la tarjeta"
              maxLength={40}
            />
            <small className="text-muted">{checkout.cardName.length}/40 caracteres</small>
            {validationErrors.cardName && (
              <small className="text-danger d-block">El nombre del titular es requerido</small>
            )}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Número de tarjeta</label>
            <input
              className={`form-control ${validationErrors.cardNumber ? "is-invalid" : ""}`}
              value={checkout.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={19}
            />
            {validationErrors.cardNumber && (
              <small className="text-danger">Debe ingresar un número de tarjeta válido (16 dígitos)</small>
            )}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Fecha de vencimiento</label>
            <input
              className={`form-control ${validationErrors.expiry ? "is-invalid" : ""}`}
              value={checkout.expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
            />
            {validationErrors.expiry && (
              <small className="text-danger">{getExpiryErrorMessage()}</small>
            )}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">
              Código de seguridad ({checkout.cardType === 'Amex' ? 'CID' : 'CVV'})
            </label>
            <input
              className={`form-control ${validationErrors.cvv ? "is-invalid" : ""}`}
              value={checkout.cvv}
              onChange={handleCvvChange}
              placeholder={checkout.cardType === 'Amex' ? 'XXXX' : 'XXX'}
              maxLength={getCvvMaxLength()}
            />
            {validationErrors.cvv && (
              <small className="text-danger">{getCvvErrorMessage()}</small>
            )}
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Tipo de tarjeta</label>
            <div className="d-flex align-items-center gap-2">
              <select
                className={`form-select w-auto ${validationErrors.cardType ? "is-invalid" : ""}`}
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
            {validationErrors.cardType && (
              <small className="text-danger">Debe seleccionar un tipo de tarjeta</small>
            )}
          </div>
        </Box>
        
        <Box mt={6} mb={6} className="text-start">
          <h4 className="mb-3">Resumen del pago</h4>
          <ul className="list-group">
            {cart.map((element, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <span>{element.product_name}</span>
                <strong>
                  ${formatPrice(element.price)} x {element.amount}
                </strong>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between">
              <span>Envío</span>
              <strong>
                {checkout.takeawayType === "delivery" ? "$1000.00" : "$0.00"}
              </strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Impuestos</span>
              <strong>${formatPrice(total * 0.21)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>
                ${checkout.takeawayType === "delivery" ? formatPrice(total * 1.21 + 1000) : formatPrice(total * 1.21)}
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
