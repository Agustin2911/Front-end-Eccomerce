import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

function Signup() {
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFetch = async () => {
    setLoading(true);

    const user_data = { mail: user_email, password: user_password };

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_data),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      if (response.headers.has("Authorization")) {
        localStorage.setItem(
          "Authorization",
          response.headers.get("Authorization")
        );
        localStorage.setItem(
          "X_Refresh_Token",
          response.headers.get("Refresh-Token")
        );
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
    const token = localStorage.getItem("Authorization");
    const refresh_token = localStorage.getItem("X_Refresh_Token");
    if (token && refresh_token) {
      fetch("http://127.0.0.1:5000/verify_token", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
          X_Refresh_Token: refresh_token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          data = JSON.parse(data);
          if (data.type === "ok") console.log("ok");
          else if (data.type === "refresh_token") console.log("refresh");
          else if (data.type === "expired") console.log("expired");
          else console.log("failed");
        });
    }
  }, []);

  useEffect(() => {
    if (data?.login === "success") {
      navigate("/");
    }
  }, [data]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundColor="#ffffff"
    >
      <Box textAlign="center" width="100%" maxWidth="400px" px="6">
        <h2
          style={{ fontSize: "24px", fontWeight: "500", marginBottom: "20px" }}
        >
          Sign in to Apple Store
        </h2>

        <input
          className="form-control"
          type="text"
          placeholder="Email or Phone Number"
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
          placeholder="Password"
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
          className="btn btn-primary w-100"
          onClick={handleFetch}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",

            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            marginBottom: "25px",
          }}
        >
          {loading ? "..." : "sign in"}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <input type="checkbox" id="remember" style={{ marginRight: "6px" }} />
          <label htmlFor="remember" style={{ fontSize: "14px" }}>
            Remember me
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <a href="#" style={{ textDecoration: "none" }}>
            Forgot password?
          </a>
        </div>

        <div style={{ fontSize: "14px" }}>
          Don’t have an Apple Account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            Create yours now.
          </Link>
        </div>
      </Box>
    </Box>
  );
}

export default Signup;
