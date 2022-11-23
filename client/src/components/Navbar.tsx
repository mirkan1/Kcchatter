import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar(props: any) {
    const user = props.user;
    const setUser = props.setUser;
    const totalSubmissions = props.totalSubmissions;
    const submissionsCount = props.submissionsCount;
    const handleSetUser = () => {
        setUser(null);
    }
    return (
        <div className="navbar">
            <div id="nav-logo-section">
                <img alt="logo" src="logo" />
            </div>
            <div id="nav-user-section">
                <div className="username">
                    {user ? <p>{user.name}</p> : <p>Guest</p>}
                </div>
                <div className="navbar-logon-div">
                    {user ? <a className="logon" href="#" onClick={handleSetUser}>Logout</a> : null}
                </div>
                <div className="status">
                {user ? <>
                    <div className="status-inner">
                        <div>OPEN</div>
                        <div>{submissionsCount.open} x {submissionsCount.closed}</div>
                    </div>
                    <div className="status-inner">
                        <div>TOTAL</div>
                        <div>{totalSubmissions.toString()}</div>
                    </div>
                    <div className="status-inner">
                        <div>% Open</div>
                        <div>25%</div>
                    </div></>
                : null}
                </div>
            </div>
        </div>
    );
}