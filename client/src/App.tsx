import { useState, useEffect } from "react";
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';
const FORM_ID = "212477037660052";

function App() {
  const [user, setUser] = useState(null);
  console.log(user)

  return (
    user ? <Home FORM_ID={FORM_ID} /> : <Login setUser={setUser} />
  )
}

export default App;
