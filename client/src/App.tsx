import { useState, useEffect } from "react";
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
// import './App.css';
const FORM_ID = "222004147160036";

function App() {
  const [user, setUser] = useState(null);
  if (user) {
    return (  
      <Home FORM_ID={FORM_ID} user={user} setUser={setUser}/>
    )
  } else {
    return (  
      <>
        <Navbar user={user} setUser={setUser} submissionsCount={{active: 0, inactive:0}}/>
        <Login setUser={setUser}/>
      </>    
    )
    
  }
}

export default App;
