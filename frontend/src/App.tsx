import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Dashboard />}/>
      <Route path= "/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
