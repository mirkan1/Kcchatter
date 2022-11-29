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
    //setUser({
    //    email:email, name:'ahmet', rows:4,
    //}); // Debug
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
    <div className="border-b border-gray-300 bg-lightblue h-screen">
      <div className="container gap-6 mx-auto flex flex-col items-center bg-lightblue">
        <b className="lg:text-3xl p-24 text-dark">Welcome To Login Page</b>
        <input className="text-xs lg:text-base w-4/5 lg:w-1/5 h-10 rounded-md border-2 border-dark p-4" onChange={onEmailChange} value={email} type="text" name="email" placeholder="email..." />
        <button className="flex items-center justify-center w-24 h-12 bg-dark hover:bg-indigo-800 transition-colors rounded-md" onClick={handleLogin}>
        <h1 className="text-base text-lightblue">Log In</h1>
        </button> 
      </div> </div>
  );
}

export default Login;