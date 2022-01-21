import React, { useState } from "react";
import ProfileDashboard from "./ProfileDashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmpDashboard from "./EmpDashboard";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-bootstrap";

function App() {
  const [token,changeToken] = useState(window.localStorage.getItem("token"))
  const [role,changeRole] = useState(window.localStorage.getItem("role"))
  const [username,changeUsername] = useState(window.localStorage.getItem("username"))
  const client = new ApiClient(
    token,
    role,
    username,
    () => logout()
  );
  const login = (newToken,newRole,newUsername) => {
    window.localStorage.setItem("token",newToken);
    window.localStorage.setItem("role",newRole);
    window.localStorage.setItem("username",newUsername);
    changeToken(newToken);
    changeRole(newRole);
    changeUsername(newUsername);
  }
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("username");
    changeRole("");
    changeToken(undefined);
    changeUsername("");

  }
  return (
    <>
    <Navbar bg="secondary alert" variant="dark">
      <Navbar.Brand><h2>The Developer Academy</h2></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-nav-nav"></Navbar.Toggle>
      <Navbar.Collapse className="nav-link">
        <Nav>
        </Nav>
      </Navbar.Collapse>
      <h4>Hello {username}!</h4>
      <h4>You are {role}</h4>
    </Navbar>
    
      {token ? (
        role=="admin" ? <ProfileDashboard client={client}  logout={logout}/> : <EmpDashboard client={client}  logout={logout}/>
      ) : (
        <Login loggedIn={(token,role) => login(token,role)} client={client} logout={logout}/>
      )
      }
    </>
  );
}
export default App;