import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/register/ImageUploader";
import { Text, Box, Button } from "@chakra-ui/react";
import { GoXCircle } from "react-icons/go";
import { setUserType, registerUser } from "../features/fetch/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
function Register() {
  // Nuevo: tipo de usuario
  const [user_name, setName] = useState("");
  const [user_LastName, setLastName] = useState("");
  const [user_email, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userPassword2, setPassword2] = useState("");
  const [dni, setDni] = useState(""); // DNI para ambos
  const [storeName, setStoreName] = useState(""); // Solo seller
  const [StoreDescription, setStoreDescription] = useState("");
  const [cuit, setCuit] = useState(0); // Solo seller
  const [image, setimage] = useState(null);

  const [data, setData] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userType, loading, error, result } = useSelector(
    (state) => state.register
  );

  const isFormValid = () => {
    const commonFields =
      user_name && user_email && userPassword && userPassword2 && image;

    if (userType === "buyer") {
      if (!commonFields || !user_LastName || !dni) {
        toast.error("faltan rellenar campos");
        return false;
      } else {
        return true;
      }
    } else if (userType === "seller") {
      if (!commonFields || !storeName || !StoreDescription || !cuit) {
        toast.error("faltan rellenar campos");
        return false;
      } else {
        return true;
      }
    }
    if (!user_email.includes("@")) {
      toast.error("Debe ingresar un email valido", { autoclose: 2500 });
      return false;
    }

    return false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid() === false) {
      return;
    }
    const formData = new FormData();

    if (userType === "buyer") {
      if (
        !user_name ||
        !user_LastName ||
        !user_email ||
        !userPassword ||
        !userPassword2 ||
        !dni
      ) {
        return toast.error("Complete todos los campos");
      }
      if (userPassword !== userPassword2)
        return toast.error("Las contraseñas no coinciden");

      formData.append("firstname", user_name);
      formData.append("name", user_name);
      formData.append("last_name", user_LastName);
      formData.append("email", user_email);
      formData.append("password", userPassword);
      formData.append("dni", dni);
      formData.append("role", 3);
      formData.append("file", image || null);
    } else {
      if (
        !user_name ||
        !user_email ||
        !userPassword ||
        !userPassword2 ||
        !storeName ||
        !StoreDescription ||
        !cuit
      ) {
        return toast.error("Complete todos los campos");
      }
      if (userPassword !== userPassword2)
        return toast.error("Las contraseñas no coinciden");

      formData.append("firstname", user_name);
      formData.append("email", user_email);
      formData.append("password", userPassword);
      formData.append("role", 2);
      formData.append("cuit", cuit);
      formData.append("companyName", storeName);
      formData.append("description", StoreDescription);
      formData.append("state", "false");
      formData.append("file", image || null);
    }

    dispatch(registerUser({ userType, formData }));
  };

  useEffect(() => {
    if (result === "success") {
      navigate("/");
    }
  }, [result]);

  return (
    <div
      style={{
        display: "flex",
        background: "#170d20",
        minHeight: "100vh",
        color: "#f1e6f7",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "500px",
          marginTop: userType === "seller" ? "100px" : "100px",
          marginBottom: userType === "seller" ? "50px" : "50px",
        }}
      >
        <ToastContainer />
        <h2 className="text-center">Crea tu cuenta de GCCustoms</h2>
        <p className="text-center">
          Crea tu cuenta de vendedor o de comprador
          <br />
          Ya tenes cuentas? Inicia sesión acá{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#ad5add" }}
          >
            Sign In
          </Link>
        </p>

        <div>
          {/* Tipo de usuario */}
          <div className="mb-3">
            <label className="form-label">Tipo de usuario:</label>
            <select
              className="form-select"
              value={userType}
              style={{
                background: "#d3a5ee",
                color: "#f1e6f7",
              }}
              onChange={(e) => dispatch(setUserType(e.target.value))}
            >
              <option value="buyer">comprador</option>
              <option value="seller">vendedor</option>
            </select>

            <div className="row mb-3 mt-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={user_name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {userType == "buyer" && (
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  value={user_LastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@gmail.com"
              value={user_email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirmar Contraseña"
              value={userPassword2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          {userType == "buyer" && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="DNI"
                value={dni}
                maxLength={8}
                onChange={(e) => setDni(e.target.value)}
              />
            </div>
          )}

          {/* Mostrar campos extra si es seller */}
          {userType === "seller" && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de la marca"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CUIT"
                  value={cuit}
                  maxLength={11}
                  onChange={(e) => setCuit(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Descripción</label>
                <textarea
                  className="form-control"
                  placeholder="Escriba una descripción..."
                  rows="6"
                  value={StoreDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                ></textarea>
              </div>
            </>
          )}

          <Text>Ingrese una imagen para su usuario</Text>
          <ImageUploader image={image} setimage={setimage}></ImageUploader>
          <button
            onClick={handleSubmit}
            className=" btn w-100"
            disabled={loading}
            style={{ background: "#ad5add", color: "#d3a5ee" }}
          >
            Crear cuenta
          </button>

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
        </div>
      </div>
    </div>
  );
}

export default Register;
