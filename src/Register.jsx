import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "./components/ImageUploader";
import { Text } from "@chakra-ui/react";

function Register({ token, settoken, setId_usuario, setImage_path, setType }) {
  const [userType, setUserType] = useState("buyer"); // Nuevo: tipo de usuario
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
  const [loading, setLoading] = useState(false);

  const handleFetchSeller = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !user_name ||
      !user_email ||
      !userPassword ||
      !userPassword2 ||
      !storeName ||
      !StoreDescription ||
      !cuit
    ) {
      alert("Complete los campos obligatorios");
      setLoading(false);
      return;
    }

    if (userPassword !== userPassword2) {
      alert("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("firstname", user_name);
    formData.append("email", user_email);
    formData.append("password", userPassword);
    formData.append("role", 2);
    formData.append("cuit", cuit);
    formData.append("companyName", storeName);
    formData.append("description", StoreDescription);
    formData.append("state", "false");

    if (image && image !== "none") {
      formData.append("file", image);
    } else {
      formData.append("file", null);
      setLoading(false);
      alert("falta poner una foto");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:1273/api/v1/auth/register/seller_user",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.access_token) {
        settoken(result.access_token);
        setId_usuario(result.id_user);
        setImage_path(result.photo_url);
        setType(result.type);
        setLoading(false);
        navigate("/");
      } else {
        alert("Compruebe que todos los datos sean correctos");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setLoading(false);
    }
  };

  const handleFetchBuyer = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !user_name ||
      !user_LastName ||
      !user_email ||
      !userPassword ||
      !userPassword2 ||
      !dni
    ) {
      alert("Complete todos los campos obligatorios");
      setLoading(false);
      return;
    }

    if (userPassword !== userPassword2) {
      alert("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("firstname", user_name);
    formData.append("name", user_name);
    formData.append("last_name", user_LastName);
    formData.append("email", user_email);
    formData.append("password", userPassword);
    formData.append("dni", dni);
    formData.append("role", 3);

    if (image !== "none") {
      formData.append("file", image);
    } else {
      formData.append("file", null);
      setLoading(false);
      alert("falta poner una foto");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:1273/api/v1/auth/register/buyer_user",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.access_token) {
        settoken(result.access_token);
        setId_usuario(result.id_user);
        setImage_path(result.photo_url);
        setType(result.type);
        setLoading(false);
        navigate("/");
      } else {
        alert("Revise los datos ingresados");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data.response === "user created") {
      navigate("/");
    }
  }, [data]);

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

        <form
          onSubmit={
            userType === "seller" ? handleFetchSeller : handleFetchBuyer
          }
        >
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
              onChange={(e) => setUserType(e.target.value)}
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
            type="submit"
            className=" btn w-100"
            disabled={loading}
            style={{ background: "#ad5add", color: "#d3a5ee" }}
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
