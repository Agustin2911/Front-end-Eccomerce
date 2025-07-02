import { Link, useNavigate, Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { GoXCircle } from "react-icons/go";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { setError } from "../features/fetch/authSlice";

import {
  setEmail,
  setPassword,
  authenticateUser,
  resetAuth,
} from "../features/fetch/authSlice";
import { fetchUserMail } from "@/features/fetch/fetchUserMail";


function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password, loading, result, error } = useSelector(
    (state) => state.auth
  );

   
  const { mail, loadingMail, errorMail } = useSelector((s) => s.userMail);



      
// 1) VALIDACIÓN RÁPIDA EN EL CLIENTE ──────────────────────
const isBlank = (str) => !str || !str.trim();

const handleCheck = async () => {
  /* 1a ─ Campos vacíos */
  if (isBlank(email)) {
    toast.error("Por favor ingrese un mail válido", { autoClose: 2500 });
    return;
  }
  if (isBlank(password)) {
    toast.error("Por favor ingrese una contraseña", { autoClose: 2500 });
    return;
  }

  /* 2 ─ Verificar si el mail existe ────────────────────── */
  try {
    await dispatch(fetchUserMail(email)).unwrap();   // ← si no existe, salta al catch
  } catch (err) {
    toast.error(
      err === "No match for provided mail"
        ? "El mail ingresado es incorrecto. Por favor ingrese un mail válido"
        : "El mail ingresado es incorrecto. Por favor ingrese un mail valido",
      { autoClose: 2500 }
    );
    return;                                          // paramos aquí; no probamos contraseña
  }

  /* 3 ─ Mail OK ► probar contraseña ───────────────────── */
  try {
    await dispatch(authenticateUser({ email, password })).unwrap();
    // el redireccionamiento se hará en tu useEffect cuando result === "success"
  } catch (err) {
    toast.error(
      err === "Invalid password"
        ? "La contraseña ingresada es incorrecta. Por favor ingrese una contraseña válida"
        :  "La contraseña ingresada es incorrecta. Por favor ingrese una contraseña válida",
      { autoClose: 2500 }
    );
  }
};

  useEffect(() => {
    if (!mail && !password && errorMail!=null) {
      toast.error("el mail ingresado o la contraseña no son validas", {
        autoClose: 3000,
      });
      dispatch(setError());
    }
  }, [mail, password, dispatch]);

  useEffect(() => {
    if (result === "success") {
      dispatch(resetAuth());
      navigate("/");
    }
  }, [result, dispatch, navigate]);


  if (loadingMail) return <Spinner />;
  if (errorMail)   return <Error msg={error} />;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundColor="#170d20"
    >
      <ToastContainer />
      <Box textAlign="center" width="100%" maxWidth="400px" px="6">
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "500",
            marginBottom: "20px",
            color: "#f1e6f7",
          }}
        >
          Iniciar sesión en GCCustoms
        </h2>

        <input
          className="form-control"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          className="form-control"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          className=" w-100"
          onClick={() => handleCheck(email)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ad5add",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            marginBottom: "25px",
          }}
        >
          {loading ? "..." : "Iniciar Sesión"}
        </button>

        <div style={{ marginBottom: "10px" }}>
          <a
            as={RouterLink}
            to="#"
            style={{ textDecoration: "none", color: "#ad5add" }}
          >
            Te olvidaste la contraseña?
          </a>
        </div>

        <div style={{ fontSize: "14px", color: "#f1e6f7" }}>
          No tenes cuenta?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#ad5add" }}
          >
            Creala aca!
          </Link>
        </div>
        <Box textAlign="center" width="100%" maxWidth="400px" px="6" mt={1}>
          <Button
            variant="plain"
            color="#ad5add"
            _hover={{ color: "#EC1877" }}
            mb="6"
            onClick={() => navigate("/")}
          >
            <GoXCircle />
            Volver
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
