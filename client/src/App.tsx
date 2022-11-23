import { useState, useEffect } from "react";
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css';
const FORM_ID = "222004147160036";

function App() {
  const [user, setUser] = useState(null);
  const [totalSubmissions, setTotalSubmissions] = useState(0);  
  const [submissionsCount, setSubmissionsCount] = useState({
    open: 0,
    closed: 0,
});
  console.log(user)
  if (user) {
    return (  
      <>
        <Navbar user={user} setUser={setUser} totalSubmissions={totalSubmissions} submissionsCount={submissionsCount}/>
        <Home FORM_ID={FORM_ID} user={user} setTotalSubmissions={setTotalSubmissions} setSubmissionsCount={setSubmissionsCount} submissionsCount={submissionsCount}/>
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
