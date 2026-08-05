import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";

export default function LogoutButton() {
  const navigate = useNavigate();

  function logout() {
    removeToken();
    navigate("/");
  }

  return (
    <button
      onClick={logout}
      className="rounded bg-red-600 px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}
