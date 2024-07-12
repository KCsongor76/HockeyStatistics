import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config"; // Assuming you have initialized Firebase Authentication
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./Auth.module.css";

function Auth({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSignIn(true);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className={classes.formGroup}>
          <label className={classes.label}>Email:</label>
          <input
            className={classes.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Password:</label>
          <input
            className={classes.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={classes.button} type="submit">
          Login
        </button>
        {error && (
          <p className={classes.error} style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Auth;
