import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userType, setUserType] = useState("buyer"); // Nuevo: tipo de usuario
  const [user_name, setName] = useState("");
  const [user_LastName, setLastName] = useState("");
  const [user_email, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userPassword2, setPassword2] = useState("");
  const [dni, setDni] = useState(""); // DNI para ambos
  const [storeName, setStoreName] = useState(""); // Solo seller
  const [StoreDescription, setStoreDescription] = useState("");
  const [cuit, setCuit] = useState(""); // Solo seller

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFetch = async (e) => {
    e.preventDefault(); // prevenir recarga

    setLoading(true);

    if (!user_name || !user_LastName || !user_email || !userPassword || !dni) {
      alert("Complete los campos obligatorios");
      setLoading(false);
      return;
    }

    if (userPassword !== userPassword2) {
      alert("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    const user_data = {
      name: user_name,
      last_name: user_LastName,
      mail: user_email,
      password: userPassword,
      dni,
      user_type: userType,
    };

    // Si es seller, agregar más campos
    if (userType === "seller") {
      if (!storeName || !cuit || !StoreDescription) {
        alert("Complete los datos del vendedor");
        setLoading(false);
        return;
      }
      user_data.store_name = storeName;
      user_data.cuit = cuit;
      user_data.SttoreDescription = StoreDescription;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/users_manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_data),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error en la petición:", error);
    } finally {
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
          marginTop: userType === "seller" ? "50px" : "200px",
        }}
      >
        <h2 className="text-center">Create Your Apple Account</h2>
        <p className="text-center">
          One Apple Account is all you need to access all Apple services.
          <br />
          Already have an Apple Account?{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#ad5add" }}
          >
            Sign In
          </Link>
        </p>

        <form onSubmit={handleFetch}>
          {/* Tipo de usuario */}
          <div className="mb-3">
            <label className="form-label">Tipo de usuario:</label>
            <select
              className="form-select"
              value={userType}
              style={{ background: "#d3a5ee", color: "#f1e6f7" }}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="buyer">comprador</option>
              <option value="seller">vendedor</option>
            </select>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={user_name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                value={user_LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>

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
                  onChange={(e) => setStoreDescripcion(e.target.value)}
                ></textarea>
              </div>
            </>
          )}

          <button
            type="submit"
            className=" btn w-100"
            disabled={loading}
            style={{ background: "#ad5add", color: "#d3a5ee" }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
