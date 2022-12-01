import { useState } from "react";
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
const FORM_ID = "222004147160036";

function App() {
  const [user, setUser] = useState(null);
  if (user) {
    return (  
      <div className="bg-crossmaskblue h-screen">
      <Home FORM_ID={FORM_ID} user={user} setUser={setUser}/>
      </div>
    )

  } else {
    return (  
      <div className="bg-crossmaskblue h-screen">
        <Navbar user={user} setUser={setUser} submissionsCount={{active: 0, inactive:0}}/>
        <Login setUser={setUser}/>
      </div>    
    )
    
  }
}

export default App;
