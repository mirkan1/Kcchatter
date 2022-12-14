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
      const _email = email.toUpperCase()
      const fileLogin = await loginHandler.fileLogin(_email);
      const name = fileLogin.name.toUpperCase()
      const role = fileLogin.role.toUpperCase()
      const mongoLogin = await loginHandler.login(_email);
      const rows = fileLogin.rows
      var _id, created_at, updated_at;
      if (mongoLogin.status === 404) {
        const mongoSignup = await loginHandler.signup(name, _email, role);
        _id = mongoSignup._id;
        created_at = mongoSignup.created_at;
        updated_at = mongoSignup.updated_at;
      } else {
        _id = mongoLogin._id;
        created_at = mongoLogin.created_at;
        updated_at = mongoLogin.updated_at;
      }
      setUser({
        email:_email, name, rows, role,
        created_at, updated_at,
      });
    } else {
      alert("invalid email");
    }
  }
  useEffect(() => {
    setEmail("MIKE.MAZZOLA@CROSSMARK.COM");
  }, []);

  return (
    <div className="smaller-body">
      <h1>Welcome To Login Page</h1>
      <input onChange={onEmailChange} value={email} type="text" name="email" placeholder="email..." />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;