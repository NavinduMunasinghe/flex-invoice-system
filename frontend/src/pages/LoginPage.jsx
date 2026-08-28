import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import authService from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Please enter username");
      return;
    }

    if (!password) {
      toast.error("Please enter password");
      return;
    }

    try {
      setLoading(true);

      // Convert username to lowercase
      const loginUsername = username.trim().toLowerCase();

      await authService.login(loginUsername, password);

      toast.success("Login successful!");

      navigate("/products", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      let message = "Invalid username or password";

      if (typeof error?.response?.data === "string") {
        message = error.response.data;
      } else if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LOGO */}
        <div style={styles.logoContainer}>
          <div style={styles.logoCircle}>
            F
          </div>
        </div>

        {/* TITLE */}
        <h1 style={styles.title}>
          Flex Mobile
        </h1>

        <p style={styles.subtitle}>
          Invoice Management System
        </p>

        <div style={styles.divider}></div>

        {/* LOGIN TITLE */}
        <h2 style={styles.loginTitle}>
          Admin Login
        </h2>

        <p style={styles.loginSubtitle}>
          Sign in to manage your system
        </p>

        <form onSubmit={handleLogin}>

          {/* USERNAME */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              style={styles.input}
              disabled={loading}
              autoComplete="username"
            />
          </div>

          {/* PASSWORD */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Password
            </label>

            <div style={styles.passwordWrapper}>
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={{
                  ...styles.input,
                  paddingRight: "75px",
                }}
                disabled={loading}
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                style={styles.showButton}
                disabled={loading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.loginButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        {/* FOOTER */}
        <p style={styles.footer}>
          Flex Mobile Invoice System
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "40px",
    boxSizing: "border-box",
    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.10)",
  },

  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "12px",
  },

  logoCircle: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "#16a34a",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    fontWeight: "700",
  },

  title: {
    textAlign: "center",
    margin: "0",
    fontSize: "26px",
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    textAlign: "center",
    marginTop: "6px",
    color: "#6b7280",
    fontSize: "14px",
  },

  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "28px 0",
  },

  loginTitle: {
    margin: "0",
    fontSize: "22px",
    color: "#111827",
  },

  loginSubtitle: {
    marginTop: "6px",
    marginBottom: "25px",
    color: "#6b7280",
    fontSize: "14px",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    width: "100%",
    height: "46px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    padding: "0 13px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },

  passwordWrapper: {
    position: "relative",
  },

  showButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    color: "#16a34a",
    fontWeight: "600",
    cursor: "pointer",
  },

  loginButton: {
    width: "100%",
    height: "48px",
    border: "none",
    borderRadius: "9px",
    background: "#16a34a",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "5px",
  },

  footer: {
    textAlign: "center",
    marginTop: "28px",
    marginBottom: "0",
    color: "#9ca3af",
    fontSize: "12px",
  },
};

export default LoginPage;