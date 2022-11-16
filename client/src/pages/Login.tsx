import { useState, useEffect } from "react";
import LoginHandler from "../handlers/LoginHandler";
import "./Login.css";

function Login(props: any) {
  const setUser = props.setUser;
  const loginHandler = new LoginHandler();
  const [email, setEmail] = useState("");
  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (validateEmail(email)) {
      const resp = await loginHandler.login(email);
      console.log("email: ", email);
      console.log("resp: ", resp);
      const user = resp.user
      const name = user.name
      const role = user.role
      const _id = user._id
      const created_at = user.created_at
      const updated_at = user.updated_at
      // set user
      setUser(email);
    } else {
      console.log("invalid email");
    }
  }

  return (
    <div className="smaller-body">
      <h1>Welcome To Login Page</h1>
      <input onChange={onEmailChange} value={email} type="text" name="email" placeholder="email..." />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;