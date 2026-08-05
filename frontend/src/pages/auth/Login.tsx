import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../../services/authService";
import { saveToken } from "../../utils/token";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await login(
        username,
        password,
      );

      saveToken(result.access_token);

      toast.success(
        "Welcome back! Login successful."
      );

      navigate("/dashboard");

    } catch {
      toast.error(
        "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center">
          SalonFlow
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Sign in to continue
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-4"
        >

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <input
            type="password"
            className="w-full border rounded-lg p-3"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-blue-600
              p-3
              text-white
              hover:bg-blue-700
              disabled:bg-gray-400
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Signing in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}
