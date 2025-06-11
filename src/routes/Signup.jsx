import { Link, useNavigate, Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { GoXCircle } from "react-icons/go";
function Signup({ token, settoken, setImage_path, setId_usuario, SetType }) {
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFetch = async () => {
    setLoading(true);

    const user_data = { email: user_email, password: user_password };

    try {
      const response = await fetch(
        "http://localhost:1273/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user_data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      SetType(result.type);
      settoken(result.access_token);
      setImage_path(result.photo_url);
      setId_usuario(result.id_user);

      setData("success");
    } catch (error) {
      console.error("Error en la petición:", error);
      alert(
        "hubo un error en el proceso del sign up, verifique que sus datos sean correctos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data === "success") {
      navigate("/");
    }
  }, [data]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundColor="#170d20"
    >
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
          value={user_email}
          onChange={(e) => setEmail(e.target.value)}
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
          placeholder="Constraseña"
          value={user_password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleFetch}
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
          <a as={RouterLink} to="#" style={{ textDecoration: "none", color: "#ad5add" }}>
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
            _hover={{ color: "#EC1877"}}
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
