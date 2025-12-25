import { useState } from "react";
import { signup } from "../api/auth";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => { e.preventDefault();
    const res = await signup({ username, email, password });
    setMessage(res?.data ? "Account Created" : "Signup Failed");
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Signup</h2>

      <input className="border p-2 w-full" placeholder="Username"onChange={e => setUsername(e.target.value)} />

      <input className="border p-2 w-full mt-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />

      <input className="border p-2 w-full mt-2" placeholder="Password"type="password" onChange={e => setPassword(e.target.value)} />

      <button className="bg-blue-500 text-white px-4 py-2 mt-3">Create Account</button>
       <p>{message}</p>
    </form>
  );
};

export default Signup;
