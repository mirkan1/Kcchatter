import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar(props: any) {
    const user = props.user;
    const setUser = props.setUser;
    const handleSetUser = () => {
        setUser(null);
    }
    return (
        <div className="navbar">
            <div id="nav-logo-section" className="nav-section">
                <h1>Logo</h1>
            </div>
            <div id="nav-user-section" className="nav-section">
                {user ? <h1>{user.name}</h1> : <h1>Guest</h1>}
                {user ? <h1 onClick={handleSetUser}>Logout</h1> : null}
            </div>
        </div>
    );
}