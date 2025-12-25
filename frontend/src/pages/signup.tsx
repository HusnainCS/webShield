import { useState } from "react";

const Signup = ()=>{
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

const [message, setMessage] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:4000/user/signup", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username, email, password
      })
    })
    const data = await response.json();
    if(response.ok){
      setMessage("Account Created Successfully");
      setUsername("");
      setEmail("");
      setPassword("");
    }else {
      setMessage(data.message || "Sign up failed");
    }
  } catch (error) {
    setMessage("Server Error")
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">    
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">    
        <h1 className="text-2xl font-bold text-center mb-6"> Sign Up</h1>

       <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1"> Username </label>
           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Enter Username"/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1"> Email </label>
           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Enter Email"/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Enter Password"/>
          </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Create Account</button> 
            {message && (<p className="text-center mt-3 text-sm text-green-600">
              {message}
            </p>)}

        </form>
      </div>
    </div>
  );
}

export default Signup;
