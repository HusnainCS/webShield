import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("loggedIn", "true");
        setMessage("You are logged in");
        navigate("/");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch {
      setMessage("Server error");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
    <input className="w-full border px-3 py-2 rounded"placeholder="Username or Email"value={emailOrUsername}onChange={(e) => setEmailOrUsername(e.target.value)} />
    <input type="password"className="w-full border px-3 py-2 rounded" placeholder="Password"value={password} onChange={(e) => setPassword(e.target.value)}/>

    <button className="w-full bg-blue-600 text-white py-2 rounded">LOGIN</button>

          {message && (<p className="text-center text-green-600 mt-2">{message}</p>)}
     </form>
      </div>
    </div>
  );
};

export default Signin;
