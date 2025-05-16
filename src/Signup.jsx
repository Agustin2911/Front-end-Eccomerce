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
    console.log(token);
    console.log(refresh_token);
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

          if (String(data.type) === "ok") {
            console.log("ok");
          } else if (data.type === "refresh_token") {
            console.log("refresh");
          } else if (data.type === "expired") {
            console.log("expired");
          } else {
            console.log("failed");
          }
        });
    }
  }, []);

  useEffect(() => {
    if (data?.login === "success") {
      navigate("/");
    }
  }, [data]);

  return (
    <Box width={"100%"} height={"100%"}>
      <Box className="w-full max-w-md text-center ">
        <h2 className="text-xl font-semibold mb-4">Sign in to Apple Store</h2>
        <div style={{ height: "125px" }}>
          <input
            type="text"
            placeholder="Email or Phone Number"
            className="form-control h-50"
            value={user_email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ height: "125px" }}>
            <input
              type="password"
              placeholder="Password"
              className="form-control h-50"
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <button
                className="p-3 h-10"
                onClick={handleFetch}
                disabled={loading}
                style={{
                  borderRadius: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? "..." : "sign in"}
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex justify-center items-center"
          style={{ marginTop: "60px" }}
        >
          <input type="checkbox" className="mr-2" />
          <label htmlFor="remember" className="text-sm ml-2">
            Remember me
          </label>
        </div>
        <div className="mt-4 text-sm">
          <a href="#" className="text-blue-600">
            Forgot password?
          </a>
        </div>
        <div className="mt-2 text-sm">
          Don’t have an Apple Account?{" "}
          <Link to="/register" className="text-blue-600">
            Create yours now.
          </Link>
        </div>
      </Box>
    </Box>
  );
}

export default Signup;
