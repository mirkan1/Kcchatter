import { useState, useEffect } from "react";
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css';
const FORM_ID = "212477037660052";

function App() {
  const [user, setUser] = useState(null);
  console.log(user)
  if (user) {
    return (  
      <>
        <Navbar user={user} setUser={setUser}/>
        <Home FORM_ID={FORM_ID} user={user} />
      </>    
    )
  } else {
    return (
      <>
        <Navbar user={null} />
        <Login setUser={setUser} />
      </>   
    )
  }
}

export default App;
