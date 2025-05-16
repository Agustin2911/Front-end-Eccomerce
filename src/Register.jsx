import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user_name, setName] = useState("");
  const [user_LastName, setLastName] = useState("");
  const [user_email, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userPassword2, setPassword2] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);

    if (!user_name) {
      console.log("a");
      setLoading(false);
      return;
    }
    if (!user_LastName) {
      console.log("b");
      setLoading(false);
      return;
    }
    if (!user_email) {
      console.log("c");
      setLoading(false);
      return;
    }

    if (!userPassword) {
      console.log("d");
      setLoading(false);
      return;
    }

    const user_data = {
      name: user_name,
      last_name: user_LastName,
      mail: user_email,
      password: userPassword,
    };

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
      console.log("fin");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data.response === "user created") {
      navigate("/");
    }
  }, [data]);

  return (
    <div style={{ display: "flex" }}>
      <div
        className="container "
        style={{ maxWidth: "500px", marginTop: "200px" }}
      >
        <h2 className="text-center">Create Your Apple Account</h2>
        <p className="text-center">
          One Apple Account is all you need to access all Apple services.
          <br />
          Already have an Apple Account?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Sign In
          </Link>
        </p>
        <form>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={user_name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={user_LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={user_email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={userPassword2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={handleFetch}
            disabled={loading}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
